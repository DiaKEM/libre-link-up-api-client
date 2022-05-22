export interface ConnectionResponse {
  status: number;
  data: Data;
  ticket: Ticket;
}

export interface Data {
  connection: Connection;
  activeSensors: ActiveSensor[];
  graphData: GlucoseItem[];
}

export interface ActiveSensor {
  sensor: Sensor;
  device: Device;
}

export interface Device {
  did: string;
  dtid: number;
  v: string;
  ll: number;
  hl: number;
  u: number;
  fixedLowAlarmValues: FixedLowAlarmValues;
  alarms: boolean;
}

export interface FixedLowAlarmValues {
  mgdl: number;
  mmoll: number;
}

export interface Sensor {
  deviceId: string;
  sn: string;
  a: number;
  w: number;
  pt: number;
}

export interface Connection {
  id: string;
  patientId: string;
  country: string;
  status: number;
  firstName: string;
  lastName: string;
  targetLow: number;
  targetHigh: number;
  uom: number;
  sensor: Sensor;
  alarmRules: AlarmRules;
  glucoseMeasurement: GlucoseItem;
  glucoseItem: GlucoseItem;
  glucoseAlarm: null;
  patientDevice: Device;
  created: number;
}

export interface AlarmRules {
  c: boolean;
  h: H;
  f: F;
  l: F;
  nd: Nd;
  p: number;
  r: number;
  std: Std;
}

export interface F {
  th: number;
  thmm: number;
  d: number;
  tl: number;
  tlmm: number;
  on?: boolean;
}

export interface H {
  on: boolean;
  th: number;
  thmm: number;
  d: number;
  f: number;
}

export interface Nd {
  i: number;
  r: number;
  l: number;
}

export interface Std {
}

export interface GlucoseItem {
  FactoryTimestamp: string;
  Timestamp: string;
  type: number;
  ValueInMgPerDl: number;
  TrendArrow?: number;
  TrendMessage?: null;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

export interface Ticket {
  token: string;
  expires: number;
  duration: number;
}

