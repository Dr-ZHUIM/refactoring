declare type CPerformance = {
  playID: string;
  audience: number;
  play?: Play;
  amount?: number;
  volumnCredit?: number
};

declare type CPerformanceEnriched = Required<CPerformance>

declare type Invoice = {
  customer: string;
  performances: CPerformance[];
};

declare type Play = {
  name: string;
  type: string;
};

declare type LendRes = {
  statement: string;
  playsAmount: string[];
  playsList: string[];
  playsEntry: Record<string, string>[];
}