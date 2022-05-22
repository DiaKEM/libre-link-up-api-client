export interface ConnectionsResponse {
  status: number;
  data: Datum[];
  ticket: Ticket;
}

export interface Datum {
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
  glucoseMeasurement: Glucose;
  glucoseItem: Glucose;
  glucoseAlarm: null;
  patientDevice: PatientDevice;
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

export interface Glucose {
  FactoryTimestamp: string;
  Timestamp: string;
  type: number;
  ValueInMgPerDl: number;
  TrendArrow: number;
  TrendMessage: null;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

export interface PatientDevice {
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

export interface Ticket {
  token: string;
  expires: number;
  duration: number;
}

