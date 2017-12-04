import { Judge } from '../core/card';

export interface JudgeCard extends Judge {
    cardCode: string;
}

export interface Judgment {
    name: string;
    judges: JudgeCard[];
}
