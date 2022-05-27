import axios from "axios";
import { LibreCgmData } from "./types/client";
import {
  ActiveSensor,
  Connection,
  GlucoseItem
} from "./types/connection";
import { ConnectionsResponse } from "./types/connections";
import { GraphData } from "./types/graph";
import { LoginResponse } from "./types/login";
import { mapData } from "./utils";

const LIBRE_LINK_SERVER = 'https://api-eu.libreview.io';

type ClientArgs = {
  username: string;
  password: string;
};

type ReadRawResponse = {
  connection: Connection,
  activeSensors: ActiveSensor[],
  graphData: GlucoseItem[]
};

type ReadResponse = {
  current: LibreCgmData,
  history: LibreCgmData[]
}

const urlMap = {
  login: '/llu/auth/login',
  connections: '/llu/connections'
}

export const LibreLinkUpClient = ({ username, password }: ClientArgs) => {
  let jwtToken: string | null = null;
  let connectionId: string | null = null;

  const instance = axios.create({
    baseURL: LIBRE_LINK_SERVER,
    headers: {
      'accept-encoding': 'gzip',
      'cache-control': 'no-cache',
      'connection': 'Keep-Alive',
      'content-type': 'application/json',
      'product': 'llu.android',
      'version': '4.2.1',
    }
  });
  instance.interceptors.request.use((config) => {

    if (jwtToken && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = `Bearer ${jwtToken}`;
    }

    return config;
  }, e => e, { synchronous: true });

  const login = async () => {
    const loginResponse = await instance.post<LoginResponse>(urlMap.login, { email: username, password });
    jwtToken = loginResponse.data.data.authTicket.token;

    return loginResponse;
  };

  const loginWrapper = <Return>(func: () => Promise<Return>) => async (): Promise<Return> => {
    try {
      if (!jwtToken) await login();
      return func();
    } catch (e) {
      await login();
      return func();
    }
  }

  const getConnections = loginWrapper<ConnectionsResponse>(async () => {
    const response = await instance.get<ConnectionsResponse>(urlMap.connections);

    return response.data;
  });

  const readRaw = loginWrapper<ReadRawResponse>(async () => {
    if (!connectionId) {
      const connections = await getConnections();
      connectionId = connections.data[0].patientId;
    }

    const response = await instance.get<GraphData>(`${urlMap.connections}/${connectionId}/graph`);

    return response.data.data;
  });

  const read = async (): Promise<ReadResponse> => {
    const response = await readRaw();

    return {
      current: mapData(response.connection.glucoseMeasurement),
      history: response.graphData.map(mapData)
    }
  }

  return {
    readRaw,
    read,
    login
  };
}
