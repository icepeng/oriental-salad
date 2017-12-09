import { Stat, CardStat } from './stats';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'app/config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { StatFilter } from './filter';

@Injectable()
export class StatsService {
  dataStore: {
    cardList: CardStat[];
    filter: StatFilter;
  };
  _cardList: BehaviorSubject<CardStat[]>;
  _filter: BehaviorSubject<StatFilter>;
  cardList: Observable<CardStat[]>;
  filter: Observable<StatFilter>;
  cardListFiltered: Observable<CardStat[]>;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
    this.dataStore = {
      cardList: [],
      filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
        sortColumn: 'value',
        sortOrder: 'DESC',
      },
    };

    this._cardList = new BehaviorSubject([...this.dataStore.cardList]);
    this._filter = new BehaviorSubject({ ...this.dataStore.filter });

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

  private filterCard(card: CardStat, filter: StatFilter) {
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

  private sortCard = (filter: StatFilter) => (a: CardStat, b: CardStat) => {
    const sign = filter.sortOrder === 'ASC' ? 1 : -1;
    const primary = filter.sortColumn;
    const secondary = filter.sortColumn === 'value' ? 'potential' : 'value';
    if (a.stats[primary].mean < b.stats[primary].mean) {
      return -1 * sign;
    }
    if (a.stats[primary].mean > b.stats[primary].mean) {
      return 1 * sign;
    }
    if (a.stats[secondary].mean < b.stats[secondary].mean) {
      return -1 * sign;
    }
    if (a.stats[secondary].mean > b.stats[secondary].mean) {
      return 1 * sign;
    }
    return 0;
  };

  setFilter(filter: StatFilter) {
    this.dataStore.filter = filter;
    this._filter.next({ ...this.dataStore.filter });
  }

  async getStats() {
    const statsList = await this.http
      .get<{ stats: Stat[] }>(`${this.appConfig.apiAddress}/cards/stats`)
      .map(res => res.stats)
      .toPromise();

    this.dataStore.cardList = statsList.map(stats => ({
      ...this.appConfig.cardData.find(card => card.code === stats.cardCode),
      stats,
    }));
    this._cardList.next([...this.dataStore.cardList]);
  }
}
