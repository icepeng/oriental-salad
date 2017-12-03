export type Classes =
  | 'Mage'
  | 'Warlock'
  | 'Shaman'
  | 'Paladin'
  | 'Preist'
  | 'Rogue'
  | 'Druid'
  | 'Hunter'
  | 'Warrior';
export type Rarity = 'Free' | 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Judge {
  value: number;
  poential: number;
  description: string;
}

export interface CardBase {
  code: string;
  name: string;
  imgLink: string;
  type: 'Minion' | 'Spell' | 'Hero';
  rarity: Rarity;
  cost: number;
  judge?: Judge;
}

export interface Hero extends CardBase {
  type: 'Hero';
  class: Classes;
}

export interface Spell extends CardBase {
  type: 'Spell';
  class: Classes;
}

export interface Minion extends CardBase {
  type: 'Minion';
  attack: number;
  health: number;
  class: Classes | 'Neutral';
}

export type Card = Minion | Spell | Hero;
