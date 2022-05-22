import axios, { AxiosResponse } from "axios";
import { LoginResponse } from "./types/login";
import { ConnectionsResponse } from "./types/connections";
import { ConnectionResponse } from "./types/connection";

const LIBRE_LINK_SERVER = 'https://api-eu.libreview.io';

type ClientArgs = {
  username: string;
  password: string;
};

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
  instance.interceptors.request.use(function(config) {

    if (jwtToken && config.headers) {
      config.headers.authorization = `Bearer ${jwtToken}`;
    }

    return config;
  }, e => e, { synchronous: true });

  const loginWrapper = <Return>(func: () => Promise<AxiosResponse<Return>>) => async (): Promise<AxiosResponse<Return>> => {
    try {
      if (!jwtToken) await login();
      return func();
    } catch (e) {
      await login();
      return func();
    }
  }

  const login = async () => {
    const loginResponse = await instance.post<LoginResponse>(urlMap.login, { email: username, password: password });
    jwtToken = loginResponse.data.data.authTicket.token;

    return loginResponse;
  };
  const getConnections = loginWrapper<ConnectionsResponse>(async () => instance.get(urlMap.connections));
  const read = loginWrapper<ConnectionResponse>(async () => {
    if (!connectionId) {
      const connections = await getConnections();
      connectionId = connections.data.data[0].patientId;
    }

    return instance.get(`${urlMap.connections}/${connectionId}/graph`);
  });

  return {
    read,
    login
  };
}
