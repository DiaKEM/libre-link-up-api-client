import { LibreCgmData } from './types/client';
import { ActiveSensor, Connection, GlucoseItem } from './types/connection';
import { Datum } from './types/connections';
import { LoginResponse } from './types/login';
declare type ClientArgs = {
    username: string;
    password: string;
    connectionIdentifier?: string | ((connections: Datum[]) => string);
};
declare type ReadRawResponse = {
    connection: Connection;
    activeSensors: ActiveSensor[];
    graphData: GlucoseItem[];
};
declare type ReadResponse = {
    current: LibreCgmData;
    history: LibreCgmData[];
};
export declare const LibreLinkUpClient: ({ username, password, connectionIdentifier, }: ClientArgs) => {
    observe: () => Promise<void>;
    readRaw: () => Promise<ReadRawResponse>;
    read: () => Promise<ReadResponse>;
    readAveraged: (amount: number, callback: (average: LibreCgmData, memory: LibreCgmData[], history: LibreCgmData[]) => void, interval?: number) => Promise<() => void>;
    login: () => Promise<LoginResponse>;
};
export {};
