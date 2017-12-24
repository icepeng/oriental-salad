import { Judge } from './judge';

export interface UserDetail extends User {
  judges: Judge[];
}

export interface User {
  name: string;
  score: string;
  rank: number | null;
}
