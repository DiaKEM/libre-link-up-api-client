import { TrendType, LibreCgmData } from './types/client';
import { GlucoseItem } from './types/connection';

export const trendMap: TrendType[] = [
  'NotComputable',
  'SingleDown',
  'FortyFiveDown',
  'Flat',
  'FortyFiveUp',
  'SingleUp',
  'NotComputable',
];

const getTrend = (
  trend: number | undefined,
  defaultTrend: TrendType = 'Flat'
) => (trend && trendMap[trend] ? trendMap[trend] : defaultTrend);

const toDate = (dateString: string): Date => new Date(dateString);

export const mapData = ({
  Value,
  isHigh,
  isLow,
  TrendArrow,
  FactoryTimestamp,
}: GlucoseItem): LibreCgmData => ({
  value: Value,
  isHigh,
  isLow,
  trend: getTrend(TrendArrow),
  date: toDate(`${FactoryTimestamp} UTC`),
});
