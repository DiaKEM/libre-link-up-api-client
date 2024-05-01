import { TrendType, LibreCgmData } from './types/client';
import { GlucoseItem } from './types/connection';
export declare const trendMap: TrendType[];
export declare const mapData: ({ Value, isHigh, isLow, TrendArrow, FactoryTimestamp, }: GlucoseItem) => LibreCgmData;
