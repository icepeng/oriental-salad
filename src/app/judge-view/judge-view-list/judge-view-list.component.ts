import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Card, Classes, Rarity } from 'app/card';
import { JudgeViewService } from '../judge-view.service';

@Component({
  selector: 'app-judge-view-list',
  templateUrl: './judge-view-list.component.html',
  styleUrls: ['./judge-view-list.component.scss'],
})
export class JudgeViewListComponent implements OnInit, OnDestroy {
  name: Observable<string>;
  list: Observable<Card[]>;
  classFilter: Observable<(Classes | 'Neutral')[]>;
  costFilter: Observable<number[]>;
  rarityFilter: Observable<Rarity[]>;
  bestValue: Observable<Card>;
  unsubscribe: Subject<void> = new Subject<void>();
  formGroup: FormGroup;

  constructor(
    private judgeViewService: JudgeViewService,
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
    this.route.params.takeUntil(this.unsubscribe).subscribe(async params => {
      await this.judgeViewService.getJudge(params['id']);
    });
    this.name = this.judgeViewService.name;
    this.list = this.judgeViewService.cardListFiltered;
    const totalList = this.judgeViewService.cardList;
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
    this.judgeViewService.filter
      .subscribe(filter => this.formGroup.reset(filter))
      .unsubscribe();
    this.formGroup.valueChanges
      .takeUntil(this.unsubscribe)
      .subscribe(value => this.judgeViewService.setFilter(value));
  }

  onClick(item: Card) {
    this.router.navigate(['./', item.code], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
