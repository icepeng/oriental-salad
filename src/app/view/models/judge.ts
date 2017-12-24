export interface Judge {
  value: number;
  potential: number;
  description: string;
  cardCode: string;
}

export interface JudgeList {
  [cardCode: string]: Judge;
}
