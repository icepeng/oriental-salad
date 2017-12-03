import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  table = {
    Mage: '마법사',
    Warlock: '흑마법사',
    Shaman: '주술사',
    Paladin: '성기사',
    Preist: '사제',
    Rogue: '도적',
    Druid: '드루이드',
    Hunter: '사냥꾼',
    Warrior: '전사',
    Neutral: '중립',
    Free: '기본',
    Common: '일반',
    Rare: '희귀',
    Epic: '영웅',
    Legendary: '전설',
    Spell: '주문',
    Minion: '하수인',
    Hero: '영웅'
  };

  transform(value: string, args?: any): string {
    return this.table[value];
  }
}
