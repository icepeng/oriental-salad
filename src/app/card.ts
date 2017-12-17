import { Stat } from './stats/stats';

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
  potential: number;
  description: string;
}

export interface CardBase {
  code: string;
  name: string;
  imgLink: string;
  type: 'Minion' | 'Spell' | 'Weapon' | 'Hero';
  rarity: Rarity;
  cost: number;
  judge?: Judge;
  stats?: Stat;
}

export interface Hero extends CardBase {
  type: 'Hero';
  class: Classes;
}

export interface Weapon extends CardBase {
  type: 'Weapon';
  attack: number;
  durability: number;
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

export type Card = Minion | Spell | Weapon | Hero;
