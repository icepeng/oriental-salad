import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { APP_CONFIG, AppConfig } from '../../config';
import { Classes, Rarity } from '../../core/models/card';
import { StatFilter } from '../models/filter';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsFilterComponent implements OnInit, OnDestroy {
  @Input()
  set filter(value: StatFilter) {
    if (this.formGroup.dirty) {
      return;
    }
    this.formGroup.reset(value);
  }
  @Output('filterChange') filterChange = new EventEmitter<StatFilter>();

  classFilter: (Classes | 'Neutral')[];
  costFilter: number[];
  rarityFilter: Rarity[];
  formGroup = new FormGroup({
    class: new FormControl(),
    cost: new FormControl(),
    rarity: new FormControl(),
    sortColumn: new FormControl(),
    sortOrder: new FormControl(),
  });
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  ngOnInit() {
    this.classFilter = this.appConfig.cardData
      .map(item => item.class)
      .reduce(
        (arr, item) => (arr.find(x => x === item) ? arr : [...arr, item]),
        [],
      )
      .sort();
    this.costFilter = this.appConfig.cardData
      .map(item => item.cost)
      .reduce(
        (arr, item) => (arr.find(x => x === item) ? arr : [...arr, item]),
        [],
      )
      .sort();
    this.rarityFilter = <Rarity[]>[
      'Common',
      'Rare',
      'Epic',
      'Legendary',
    ].filter(rarity => this.appConfig.cardData.find(x => x.rarity === rarity));

    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(value => this.filterChange.emit(value));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
