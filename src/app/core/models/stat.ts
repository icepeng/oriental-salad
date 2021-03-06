export interface StatElement {
  20: number;
  30: number;
  40: number;
  50: number;
  60: number;
  70: number;
  80: number;
  mean: number;
  stdev: number;
}

export interface Stat {
  cardCode: string;
  judgeTotal: number;
  descriptionAverage: string;
  value: StatElement;
  potential: StatElement;
  hsreplay?: HSReplayStat;
}

export interface StatList {
  [cardCode: string]: Stat;
}

export interface HSReplayStat {
  popularity: string;
  popularityClass: string;
  winRate: string;
  value: string;
  potential: string;
  archetypes: {
    id: number;
    name: string;
    playerClass: string;
    url: string;
    winRate: number;
    popularity: number;
    popularityClass: number;
    totalGames: number;
    weight: number;
  }[];
}
