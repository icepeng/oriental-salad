import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JudgeCardService } from '../judge-card.service';
import { Card, Classes, Rarity } from 'app/card';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-judge-card-list',
  templateUrl: './judge-card-list.component.html',
  styleUrls: ['./judge-card-list.component.scss'],
})
export class JudgeCardListComponent implements OnInit, OnDestroy {
  list: Observable<Card[]>;
  classFilter: Observable<(Classes | 'Neutral')[]>;
  costFilter: Observable<number[]>;
  rarityFilter: Observable<Rarity[]>;
  unsubscribe: Subject<void> = new Subject<void>();
  formGroup: FormGroup;

  constructor(
    private judgeCardService: JudgeCardService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      class: new FormControl(),
      cost: new FormControl(),
      rarity: new FormControl(),
    });
    this.list = this.judgeCardService.cardListFiltered;
    const totalList = this.judgeCardService.cardList;
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
    this.judgeCardService.filter
      .subscribe(filter => this.formGroup.reset(filter))
      .unsubscribe();
    this.formGroup.valueChanges
      .takeUntil(this.unsubscribe)
      .subscribe(value => this.judgeCardService.setFilter(value));
  }

  onClick(item: Card) {
    this.router.navigate(['/', 'judge', 'form', item.code]);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
