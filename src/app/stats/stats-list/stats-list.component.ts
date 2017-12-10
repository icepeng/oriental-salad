import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CardStat } from '../stats';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.scss'],
})
export class StatsListComponent implements OnInit, OnDestroy {
  list: Observable<CardStat[]>;
  viewLimit = 20;
  _viewLimit: BehaviorSubject<number> = new BehaviorSubject(20);
  total: Observable<number>;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private statsService: StatsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.list = Observable.combineLatest(
      this.statsService.cardListFiltered,
      this._viewLimit,
    ).map(([cardList, viewLimit]) => [
      ...cardList.slice(0, Math.min(viewLimit, cardList.length)),
    ]);
    this.total = this.statsService.cardListFiltered.map(list => list.length);

    this.statsService.cardListFiltered
      .takeUntil(this.unsubscribe)
      .subscribe(value => {
        this.viewLimit = 20;
        this._viewLimit.next(this.viewLimit);
      });
  }

  onClick(item: CardStat) {
    this.router.navigate(['../', item.code], { relativeTo: this.route });
  }

  moreCards() {
    this.viewLimit += 20;
    this._viewLimit.next(this.viewLimit);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
