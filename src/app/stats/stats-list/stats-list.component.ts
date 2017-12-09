import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classes, Rarity } from 'app/card';
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
  classFilter: Observable<(Classes | 'Neutral')[]>;
  costFilter: Observable<number[]>;
  rarityFilter: Observable<Rarity[]>;
  unsubscribe: Subject<void> = new Subject<void>();
  formGroup: FormGroup;

  constructor(
    private statsService: StatsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      class: new FormControl(),
      cost: new FormControl(),
      rarity: new FormControl(),
      sortColumn: new FormControl(),
      sortOrder: new FormControl(),
    });

    this.list = Observable.combineLatest(
      this.statsService.cardListFiltered,
      this._viewLimit,
    ).map(([cardList, viewLimit]) => [
      ...cardList.slice(0, Math.min(viewLimit, cardList.length)),
    ]);
    this.total = this.statsService.cardListFiltered.map(list => list.length);

    const totalList = this.statsService.cardList;
    this.classFilter = totalList.map(list =>
      list
        .map(item => item.class)
        .reduce(
          (arr, item) => (arr.find(x => x === item) ? arr : [...arr, item]),
          [],
        )
        .sort(),
    );
    this.costFilter = totalList.map(list =>
      list
        .map(item => item.cost)
        .reduce(
          (arr, item) => (arr.find(x => x === item) ? arr : [...arr, item]),
          [],
        )
        .sort(),
    );
    this.rarityFilter = totalList.map(
      list =>
        <Rarity[]>['Common', 'Rare', 'Epic', 'Legendary'].filter(rarity =>
          list.find(x => x.rarity === rarity),
        ),
    );

    this.statsService.filter
      .subscribe(filter => this.formGroup.reset(filter))
      .unsubscribe();
    this.formGroup.valueChanges.takeUntil(this.unsubscribe).subscribe(value => {
      this.viewLimit = 20;
      this._viewLimit.next(this.viewLimit);
      this.statsService.setFilter(value);
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
