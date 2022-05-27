export type TrendType =
  | 'SingleDown'
  | 'FortyFiveDown'
  | 'Flat'
  | 'FortyFiveUp'
  | 'SingleUp'
  | 'NotComputable';

export type LibreCgmData = {
  value: number;
  isHigh: boolean;
  isLow: boolean;
  trend: TrendType;
  date: Date;
};
