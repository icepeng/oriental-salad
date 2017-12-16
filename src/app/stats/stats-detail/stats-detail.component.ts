import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CardStat, StatDetail } from '../stats';
import { StatsService } from '../stats.service';
import { StatsDetailService } from './stats-detail.service';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.scss'],
})
export class StatsDetailComponent implements OnInit {
  clickRefresh: BehaviorSubject<number>;
  info: Observable<{ index: number; total: number }>;
  card: Observable<CardStat>;
  cardPrev: Observable<CardStat>;
  cardNext: Observable<CardStat>;
  statsDetail: Observable<StatDetail>;
  valueStats: Observable<{ name: string; value: number }[]>;
  potentialStats: Observable<{ name: string; value: number }[]>;

  constructor(
    private statsService: StatsService,
    private statsDetailService: StatsDetailService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const cards = Observable.combineLatest(
      this.statsService.cardListFiltered,
      this.route.params,
    )
      .map(([cardList, params]) => {
        const cardCode = params['id'];
        const index = cardList.findIndex(card => card.code === cardCode);
        return {
          index,
          total: cardList.length,
          card: cardList[index],
          cardPrev: index > 0 ? cardList[index - 1] : null,
          cardNext: index < cardList.length - 1 ? cardList[index + 1] : null,
        };
      })
      .publishReplay(1)
      .refCount();

    this.info = cards.map(x => ({ index: x.index, total: x.total }));
    this.card = cards.map(x => x.card);
    this.cardPrev = cards.map(x => x.cardPrev);
    this.cardNext = cards.map(x => x.cardNext);

    this.clickRefresh = new BehaviorSubject<number>(1);
    this.statsDetail = Observable.combineLatest(
      this.route.params,
      this.clickRefresh,
    ).switchMap(([params]) =>
      this.statsDetailService.getStatsDetail(params['id']),
    );
    this.clickRefresh.next(1);

    this.valueStats = this.card.map(card =>
      [20, 30, 40, 50, 60, 70, 80].map(x => ({
        name: x.toString(),
        value: card.stats.value[x],
      })),
    );
    this.potentialStats = this.card.map(card =>
      [20, 30, 40, 50, 60, 70, 80].map(x => ({
        name: x.toString(),
        value: card.stats.potential[x],
      })),
    );
  }

  refresh() {
    this.clickRefresh.next(1);
  }

  prev() {
    this.cardPrev
      .first()
      .filter(card => !!card)
      .subscribe(card =>
        this.router.navigate(['../', card.code], { relativeTo: this.route }),
      );
  }

  next() {
    this.cardNext
      .first()
      .filter(card => !!card)
      .subscribe(card =>
        this.router.navigate(['../', card.code], { relativeTo: this.route }),
      );
  }
}
