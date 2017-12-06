import { Judge } from 'app/card';

export interface JudgeCard extends Judge {
    cardCode: string;
}

export interface Judgment {
    name: string;
    judges: JudgeCard[];
}
