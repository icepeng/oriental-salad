import { Judge } from 'app/card';

export interface JudgeCard extends Judge {
    cardCode: string;
}

export interface Judgment extends JudgeInfo {
    judges: JudgeCard[];
}

export interface JudgeInfo {
    name: string;
    score: string;
    rank: number | null;
}
