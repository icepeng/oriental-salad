import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JudgeViewService } from '../judge-view.service';
import { Card, Judge } from '../../core/card';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-judge-view-detail',
  templateUrl: './judge-view-detail.component.html',
  styleUrls: ['./judge-view-detail.component.scss']
})
export class JudgeViewDetailComponent implements OnInit, OnDestroy {
  card: Card;
  cardPrev: Card | null;
  cardNext: Card | null;
  formGroup: FormGroup;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private judgeViewService: JudgeViewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      value: new FormControl('', [
        Validators.min(20),
        Validators.max(80),
        Validators.required
      ]),
      potential: new FormControl('', [
        Validators.min(20),
        Validators.max(80),
        Validators.required
      ]),
      description: new FormControl('')
    });

    Observable.combineLatest(
      this.judgeViewService.cardListFiltered,
      this.route.params
    )
      .takeUntil(this.unsubscribe)
      .subscribe(([cardList, params]) => {
        const cardCode = params['cardId'];
        const index = cardList.findIndex(card => card.code === cardCode);
        this.card = cardList[index];
        this.cardPrev = index > 0 ? cardList[index - 1] : null;
        this.cardNext =
          index < cardList.length - 1 ? cardList[index + 1] : null;
        if (!!this.card.judge) {
          return this.formGroup.reset(this.card.judge);
        }
        return this.formGroup.reset({
          value: '',
          potential: '',
          description: ''
        });
      });
  }

  prev() {
    if (!this.cardPrev) {
      return;
    }
    this.router.navigate(['../', this.cardPrev.code], {
      relativeTo: this.route
    });
  }

  next() {
    if (!this.cardNext) {
      return;
    }
    this.router.navigate(['../', this.cardNext.code], {
      relativeTo: this.route
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
