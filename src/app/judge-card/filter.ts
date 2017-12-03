import { Classes, Rarity } from './card';

export interface Filter {
  class: Classes | 'Neutral' | 'ALL';
  rarity: Rarity | 'ALL';
  cost: string | 'ALL';
}
