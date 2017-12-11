import { Card, Judge } from '../card';

export type CardStat = { stats: Stat } & Card;

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
  hsreplay?: {
    popularity: string;
    winRate: string;
  };
}

export interface StatJudge extends Judge {
  cardCode: string;
  upload: {
    id: string;
    name: string;
  };
}

export interface StatDetail {
  maxValueJudge: StatJudge;
  minValueJudge: StatJudge;
  maxPotentialJudge: StatJudge;
  minPotentialJudge: StatJudge;
  longestJudge: StatJudge;
}
