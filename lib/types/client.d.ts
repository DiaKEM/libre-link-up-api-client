export declare type TrendType = 'SingleDown' | 'FortyFiveDown' | 'Flat' | 'FortyFiveUp' | 'SingleUp' | 'NotComputable';
export declare type LibreCgmData = {
    value: number;
    isHigh: boolean;
    isLow: boolean;
    trend: TrendType;
    date: Date;
};
