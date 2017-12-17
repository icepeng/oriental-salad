export interface StaticStat {
  judgeCount: number;
  uploadCount: number;
  longestDescriptions: {
    id: string;
    name: string;
    length: number;
  }[];
  highestValues: ValueStat[];
  lowestValues: ValueStat[];
  highestPotentials: ValueStat[];
  lowestPotentials: ValueStat[];
}

export interface DynamicStat {
  bestUploads: ScoreStat[];
  worstUploads: ScoreStat[];
}

export interface Stat extends StaticStat, DynamicStat {}

export interface ValueStat {
  id: string;
  name: string;
  average: number;
}

export interface ScoreStat {
  id: string;
  name: string;
  score: string;
  rank: number;
}
