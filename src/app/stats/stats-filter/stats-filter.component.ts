import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Classes, Rarity } from 'app/card';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.component.html',
  styleUrls: ['./stats-filter.component.scss'],
})
export class StatsFilterComponent implements OnInit, OnDestroy {
  classFilter: Observable<(Classes | 'Neutral')[]>;
  costFilter: Observable<number[]>;
  rarityFilter: Observable<Rarity[]>;
  formGroup: FormGroup;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      class: new FormControl(),
      cost: new FormControl(),
      rarity: new FormControl(),
      sortColumn: new FormControl(),
      sortOrder: new FormControl(),
    });
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
    this.formGroup.valueChanges
      .takeUntil(this.unsubscribe)
      .subscribe(value => this.statsService.setFilter(value));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
