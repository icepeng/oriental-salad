import { Classes, Rarity } from '../../core/models/card';

export interface StatFilter {
  class: Classes | 'Neutral' | 'ALL';
  rarity: Rarity | 'ALL';
  cost: string | 'ALL';
  sortColumn: 'value' | 'potential';
  sortOrder: 'ASC' | 'DESC';
}
