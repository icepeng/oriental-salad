import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Card, Judge } from 'app/card';
import { APP_CONFIG, AppConfig } from 'app/config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../core/core.service';
import { Filter } from '../core/filter';

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
  cardListJudged: Observable<Card[]>;

  constructor(
    private coreService: CoreService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
    this.dataStore = {
      cardList: [...this.appConfig.cardData],
      filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
      },
    };
    const existingJudge = localStorage.getItem('judge');
    if (existingJudge) {
      this.dataStore.cardList = JSON.parse(existingJudge);
    }

    this._cardList = new BehaviorSubject([...this.dataStore.cardList]);
    this._filter = new BehaviorSubject({ ...this.dataStore.filter });

    this.cardList = this._cardList.asObservable();
    this.filter = this._filter.asObservable();
    this.cardListFiltered = Observable.combineLatest(
      this.cardList,
      this.filter,
    ).map(([cardList, filter]) =>
      cardList.filter(card => this.filterCard(card, filter)),
    );
    this.cardListJudged = this.cardList.map(cardList =>
      cardList.filter(card => !!card.judge),
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
    this.dataStore.cardList = this.dataStore.cardList.map(
      card =>
        card.code === code
          ? {
              ...card,
              judge,
            }
          : card,
    );
    localStorage.setItem('judge', JSON.stringify(this.dataStore.cardList));
    this._cardList.next([...this.dataStore.cardList]);
  }

  async submit(cardList: Card[], name: string) {
    const upload = {
      name,
      judges: cardList.map(card => ({
        ...card.judge,
        cardCode: card.code,
      })),
    };
    const result = await this.http
      .post<{ id: string }>(`${this.coreService.API_ADDRESS}/upload`, upload)
      .map(res => res.id)
      .toPromise();

    this.dataStore = {
      cardList: [...this.appConfig.cardData],
      filter: {
        class: 'ALL',
        cost: 'ALL',
        rarity: 'ALL',
      },
    };
    this._cardList.next([...this.dataStore.cardList]);
    this._filter.next({ ...this.dataStore.filter });
    localStorage.removeItem('judge');

    return result;
  }
}
