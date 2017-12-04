import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JudgeCardService } from '../judge-card.service';
import { Card, Judge } from '../../core/card';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-judge-card-form',
  templateUrl: './judge-card-form.component.html',
  styleUrls: ['./judge-card-form.component.scss']
})
export class JudgeCardFormComponent implements OnInit, OnDestroy {
  card: Card;
  cardPrev: Card | null;
  cardNext: Card | null;
  formGroup: FormGroup;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private judgeCardService: JudgeCardService,
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
      this.judgeCardService.cardListFiltered,
      this.route.params
    )
      .takeUntil(this.unsubscribe)
      .subscribe(([cardList, params]) => {
        const cardCode = params['id'];
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

  submit(value: Judge, code: string) {
    if (this.formGroup.invalid) {
      return;
    }
    this.judgeCardService.saveJudge(value, code);
    if (!this.cardNext) {
      return this.router.navigate(['/', 'judge']);
    }
    this.router.navigate(['../', this.cardNext.code], {
      relativeTo: this.route,
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

  canDeactivate() {
    if (this.formGroup.dirty) {
      return window.confirm(
        '변경사항이 저장되지 않을 수 있습니다. 정말 이동하시겠습니까?'
      );
    }
    return true;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
