import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Card } from '../core/card';
import { CARD_LIST } from '../core/cards';
import { CoreService } from '../core/core.service';
import { Filter } from '../core/filter';
import { Judgment } from './judgment';

@Injectable()
export class JudgeViewService {
  dataStore: {
    name: string;
    cardList: Card[];
    filter: Filter;
  };
  _name: BehaviorSubject<string>;
  _cardList: BehaviorSubject<Card[]>;
  _filter: BehaviorSubject<Filter>;
  name: Observable<string>;
  cardList: Observable<Card[]>;
  filter: Observable<Filter>;
  cardListFiltered: Observable<Card[]>;

  constructor(private coreService: CoreService, private http: HttpClient) {
    this.dataStore = {
      name: '',
      cardList: [],
      filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
      },
    };

    this._name = new BehaviorSubject(this.dataStore.name);
    this._cardList = new BehaviorSubject([...this.dataStore.cardList]);
    this._filter = new BehaviorSubject({ ...this.dataStore.filter });

    this.name = this._name.asObservable();
    this.cardList = this._cardList.asObservable();
    this.filter = this._filter.asObservable();
    this.cardListFiltered = Observable.combineLatest(
      this.cardList,
      this.filter,
    ).map(([cardList, filter]) =>
      cardList.filter(card => this.filterCard(card, filter)),
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

  async getJudge(id: string) {
    const judgment = await this.http
      .get<{ upload: Judgment }>(`${this.coreService.API_ADDRESS}/upload/${id}`)
      .map(res => res.upload)
      .toPromise();

    this.dataStore.name = judgment.name;
    this._name.next(this.dataStore.name);

    this.dataStore.cardList = judgment.judges.map(judge => ({
      ...CARD_LIST.find(card => card.code === judge.cardCode),
      judge: {
        value: judge.value,
        potential: judge.potential,
        description: judge.description,
      },
    }));
    this._cardList.next([...this.dataStore.cardList]);
  }
}
