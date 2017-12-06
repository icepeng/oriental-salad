import { Classes, Rarity } from 'app/card';

export interface Filter {
  class: Classes | 'Neutral' | 'ALL';
  rarity: Rarity | 'ALL';
  cost: string | 'ALL';
}
