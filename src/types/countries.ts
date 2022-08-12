export interface AE {
  lslApi: string;
  socketHub: string;
}

export interface RegionalMap {
  us: AE;
  eu: AE;
  fr: AE;
  jp: AE;
  de: AE;
  ap: AE;
  au: AE;
  ae: AE;
}

interface Data {
  regionalMap: RegionalMap;
}

export interface CountryResponse {
  status: number;
  data: Data;
}
