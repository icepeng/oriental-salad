export interface Stat {
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

export interface ValueStat {
  id: string;
  name: string;
  average: number;
}
