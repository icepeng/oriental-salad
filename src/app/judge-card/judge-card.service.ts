import { Injectable } from '@angular/core';

import { Card, Judge } from './card';
import { CARD_LIST } from './cards';
import { Filter } from './filter';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JudgeCardService {
  dataStore: {
    cardList: Card[];
    filter: Filter;
  };
  _cardList: BehaviorSubject<Card[]>;
  _filter: BehaviorSubject<Filter>;
  cardList: Observable<Card[]>;
  filter: Observable<Filter>;
  cardListFiltered: Observable<Card[]>;

  constructor() {
    this.dataStore = {
      cardList: CARD_LIST,
      filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL'
      }
    };

    this._cardList = new BehaviorSubject([...this.dataStore.cardList]);
    this._filter = new BehaviorSubject({ ...this.dataStore.filter });

    this.cardList = this._cardList.asObservable();
    this.filter = this._filter.asObservable();
    this.cardListFiltered = Observable.combineLatest(
      this.cardList,
      this.filter
    ).map(([cardList, filter]) =>
      cardList.filter(card => this.filterCard(card, filter))
    );
  }

  filterCard(card: Card, filter: Filter) {
    if (card.class !== filter.class && filter.class !== 'ALL') {
      return false;
    }
    if (card.rarity !== filter.rarity && filter.rarity !== 'ALL') {
      return false;
    }
    if (filter.cost !== 'ALL' && card.cost !== +filter.cost) {
      return false;
    }
    return true;
  }

  setFilter(filter: Filter) {
    this.dataStore.filter = filter;
    this._filter.next({ ...this.dataStore.filter });
  }

  saveJudge(judge: Judge, code: string) {
    const cardToJudge = this.dataStore.cardList.find(
      card => card.code === code
    );
    cardToJudge.judge = judge;
    this._cardList.next([...this.dataStore.cardList]);
  }
}
