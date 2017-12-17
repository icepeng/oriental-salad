import { Stat } from '../stats/stats';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Card } from 'app/card';
import { APP_CONFIG, AppConfig } from 'app/config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { ViewFilter } from './filter';
import { JudgeInfo, Judgment } from './judgment';

@Injectable()
export class JudgeViewService {
  dataStore: {
    data: JudgeInfo;
    cardList: Card[];
    filter: ViewFilter;
  };
  _data: BehaviorSubject<JudgeInfo>;
  _cardList: BehaviorSubject<Card[]>;
  _filter: BehaviorSubject<ViewFilter>;
  data: Observable<JudgeInfo>;
  cardList: Observable<Card[]>;
  filter: Observable<ViewFilter>;
  cardListFiltered: Observable<Card[]>;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
    this.dataStore = {
      data: {
        name: '',
        score: '',
        rank: null,
      },
      cardList: [],
      filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
        sortColumn: 'value',
        sortOrder: 'DESC',
      },
    };

    this._data = new BehaviorSubject(this.dataStore.data);
    this._cardList = new BehaviorSubject([...this.dataStore.cardList]);
    this._filter = new BehaviorSubject({ ...this.dataStore.filter });

    this.data = this._data.asObservable();
    this.cardList = this._cardList.asObservable();
    this.filter = this._filter.asObservable();
    this.cardListFiltered = Observable.combineLatest(
      this.cardList,
      this.filter,
    ).map(([cardList, filter]) =>
      cardList
        .filter(card => this.filterCard(card, filter))
        .sort(this.sortCard(filter)),
    );
  }

  private filterCard(card: Card, filter: ViewFilter) {
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

  private sortCard = (filter: ViewFilter) => (a: Card, b: Card) => {
    const sign = filter.sortOrder === 'ASC' ? 1 : -1;
    const primary = filter.sortColumn;
    const secondary = filter.sortColumn === 'value' ? 'potential' : 'value';
    if (a.judge[primary] < b.judge[primary]) {
      return -1 * sign;
    }
    if (a.judge[primary] > b.judge[primary]) {
      return 1 * sign;
    }
    if (a.judge[secondary] < b.judge[secondary]) {
      return -1 * sign;
    }
    if (a.judge[secondary] > b.judge[secondary]) {
      return 1 * sign;
    }
    return 0;
  };

  setFilter(filter: ViewFilter) {
    this.dataStore.filter = filter;
    this._filter.next({ ...this.dataStore.filter });
  }

  async getJudge(id: string) {
    const judgment = await this.http
      .get<{ upload: Judgment }>(`${this.appConfig.apiAddress}/upload/${id}`)
      .map(res => res.upload)
      .toPromise();

    const statsList = await this.http
      .get<{ stats: Stat[] }>(`${this.appConfig.apiAddress}/cards/stats`)
      .map(res => res.stats)
      .toPromise();

    this.dataStore.data = {
      name: judgment.name,
      score: judgment.score,
      rank: judgment.rank,
    };
    this._data.next({ ...this.dataStore.data });

    this.dataStore.cardList = judgment.judges.map(judge => ({
      ...this.appConfig.cardData.find(card => card.code === judge.cardCode),
      judge: {
        value: judge.value,
        potential: judge.potential,
        description: judge.description,
      },
      stats: statsList.find(stat => stat.cardCode === judge.cardCode),
    }));
    this._cardList.next([...this.dataStore.cardList]);
  }
}
