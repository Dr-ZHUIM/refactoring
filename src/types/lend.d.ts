declare type CPerformance = {
  playID: string;
  audience: number;
  play?: Play;
  amount?: number;
  volumnCredits?: number;
  totalCredits?: number;
  totalAmount?: number
};

declare type CPerformanceEnriched = Required<CPerformance>

declare type StatementData = {
  customer: string,
  performances: CPerformanceEnriched[],
  totalCredits: number,
  totalAmount: number
}

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