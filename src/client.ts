import axios from 'axios';
import { LibreCgmData } from './types/client';
import { ActiveSensor, Connection, GlucoseItem } from './types/connection';
import { ConnectionsResponse, Datum } from './types/connections';
import { CountryResponse, AE, RegionalMap } from './types/countries';
import { GraphData } from './types/graph';
import { LoginResponse, LoginRedirectResponse, StepData } from './types/login';
import { mapData, trendMap } from './utils';

const LIBRE_LINK_SERVER = 'https://api-us.libreview.io';

type ClientArgs = {
  username: string;
  password: string;
  clientVersion?: string;
  connectionIdentifier?: string | ((connections: Datum[]) => string);
};

type ReadRawResponse = {
  connection: Connection;
  activeSensors: ActiveSensor[];
  graphData: GlucoseItem[];
};

type ReadResponse = {
  current: LibreCgmData;
  history: LibreCgmData[];
};

const urlMap = {
  login: '/llu/auth/login',
  connections: '/llu/connections',
  countries: '/llu/config/country?country=DE',
};

export const LibreLinkUpClient = ({
  username,
  password,
  clientVersion,
  connectionIdentifier,
}: ClientArgs) => {
  let jwtToken: string | null = null;
  let connectionId: string | null = null;

  const instance = axios.create({
    baseURL: LIBRE_LINK_SERVER,
    headers: {
      'accept-encoding': 'gzip',
      'cache-control': 'no-cache',
      connection: 'Keep-Alive',
      'content-type': 'application/json',
      product: 'llu.android',
      version: clientVersion ?? '4.9.0',
    },
  });
  instance.interceptors.request.use(
    config => {
      if (jwtToken && config.headers) {
        // eslint-disable-next-line no-param-reassign
        config.headers.authorization = `Bearer ${jwtToken}`;
      }

      return config;
    },
    e => e,
    { synchronous: true }
  );

  const login = async (): Promise<LoginResponse> => {
    const loginResponse = await instance.post<
      LoginResponse | LoginRedirectResponse
    >(urlMap.login, {
      email: username,
      password,
    });

    if (loginResponse.data.status === 2) {
      throw new Error(
        'Bad credentials. Please ensure that you have entered the credentials of your LibreLinkUp account (and not of your LibreLink account).'
      );
    }

    if (loginResponse.data.status === 4) {
      throw new Error(
        `Additional action required for your account: ${
          (loginResponse.data.data as StepData).step?.componentName || 'unknown'
        }. Please login via app and perform required steps and try again.`
      );
    }

    if ((loginResponse.data as LoginRedirectResponse).data.redirect) {
      const redirectResponse = loginResponse.data as LoginRedirectResponse;
      const countryNodes = await instance.get<CountryResponse>(
        urlMap.countries
      );
      const targetRegion = redirectResponse.data.region as keyof RegionalMap;
      const regionDefinition: AE | undefined =
        countryNodes.data.data.regionalMap[targetRegion];

      if (!regionDefinition) {
        throw new Error(
          `Unable to find region '${redirectResponse.data.region}'. 
          Available nodes are ${Object.keys(
            countryNodes.data.data.regionalMap
          ).join(', ')}.`
        );
      }

      instance.defaults.baseURL = regionDefinition.lslApi;
      return login();
    }
    jwtToken = (loginResponse.data as LoginResponse).data.authTicket.token;

    return loginResponse.data as LoginResponse;
  };

  const loginWrapper =
    <Return>(func: () => Promise<Return>) =>
    async (): Promise<Return> => {
      try {
        if (!jwtToken) await login();
        return func();
      } catch (e) {
        await login();
        return func();
      }
    };

  const getConnections = loginWrapper<ConnectionsResponse>(async () => {
    const response = await instance.get<ConnectionsResponse>(
      urlMap.connections
    );

    return response.data;
  });

  const getConnection = (connections: Datum[]): string => {
    if (typeof connectionIdentifier === 'string') {
      const match = connections.find(
        ({ firstName, lastName }) =>
          `${firstName} ${lastName}`.toLowerCase() ===
          connectionIdentifier.toLowerCase()
      );

      if (!match) {
        throw new Error(
          `Unable to identify connection by given name '${connectionIdentifier}'.`
        );
      }

      return match.patientId;
    }
    if (typeof connectionIdentifier === 'function') {
      const match = connectionIdentifier.call(null, connections);

      if (!match) {
        throw new Error(`Unable to identify connection by given name function`);
      }

      return match;
    }

    return connections[0].patientId;
  };

  const readRaw = loginWrapper<ReadRawResponse>(async () => {
    if (!connectionId) {
      const connections = await getConnections();

      if (connections.data.length === 0) {
        throw new Error(
          'Your account does not follow any patients. Pleas start following and try again.'
        );
      }

      connectionId = getConnection(connections.data);
    }

    const response = await instance.get<GraphData>(
      `${urlMap.connections}/${connectionId}/graph`
    );

    return response.data.data;
  });

  const read = async (): Promise<ReadResponse> => {
    const response = await readRaw();

    return {
      current: mapData(response.connection.glucoseMeasurement),
      history: response.graphData.map(mapData),
    };
  };

  const observe = async () => {
    // @todo
  };

  let averageInterval: NodeJS.Timer;
  const readAveraged = async (
    amount: number,
    callback: (
      average: LibreCgmData,
      memory: LibreCgmData[],
      history: LibreCgmData[]
    ) => void,
    interval = 15000
  ) => {
    let mem: Map<string, LibreCgmData> = new Map();

    averageInterval = setInterval(async () => {
      const { current, history } = await read();
      mem.set(current.date.toString(), current);

      if (mem.size === amount) {
        const memValues = Array.from(mem.values());
        const averageValue = Math.round(
          memValues.reduce((acc, cur) => acc + cur.value, 0) / amount
        );
        const averageTrend =
          trendMap[
            parseInt(
              (
                Math.round(
                  (memValues.reduce(
                    (acc, cur) => acc + trendMap.indexOf(cur.trend),
                    0
                  ) /
                    amount) *
                    100
                ) / 100
              ).toFixed(0),
              10
            )
          ];

        mem = new Map();
        callback.apply(null, [
          {
            trend: averageTrend,
            value: averageValue,
            date: current.date,
            isHigh: current.isHigh,
            isLow: current.isLow,
          },
          memValues,
          history,
        ]);
      }
    }, interval);

    return () => clearInterval(averageInterval);
  };

  return {
    observe,
    readRaw,
    read,
    readAveraged,
    login,
  };
};
