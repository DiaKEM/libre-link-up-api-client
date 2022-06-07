/* eslint-disable no-use-before-define */

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

interface AlarmRules {
  c: boolean;
  h: H;
  f: F;
  l: F;
  nd: Nd;
  p: number;
  r: number;
  std: Std;
}

interface F {
  th: number;
  thmm: number;
  d: number;
  tl: number;
  tlmm: number;
  on?: boolean;
}

interface H {
  on: boolean;
  th: number;
  thmm: number;
  d: number;
  f: number;
}

interface Nd {
  i: number;
  r: number;
  l: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Std {}

interface Glucose {
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

interface PatientDevice {
  did: string;
  dtid: number;
  v: string;
  ll: number;
  hl: number;
  u: number;
  fixedLowAlarmValues: FixedLowAlarmValues;
  alarms: boolean;
}

interface FixedLowAlarmValues {
  mgdl: number;
  mmoll: number;
}

interface Sensor {
  deviceId: string;
  sn: string;
  a: number;
  w: number;
  pt: number;
}

interface Ticket {
  token: string;
  expires: number;
  duration: number;
}
