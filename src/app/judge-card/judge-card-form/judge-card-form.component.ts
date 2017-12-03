import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JudgeCardService } from '../judge-card.service';
import { JudgeCardFormService } from './judge-card-form.service';
import { Card, Judge } from '../card';

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
  formGroup: FormGroup;
  isFirst: boolean;
  isLast: boolean;
  submitAttempt: Observable<boolean>;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private judgeCardService: JudgeCardService,
    private judgeCardFormService: JudgeCardFormService,
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
    this.submitAttempt = this.judgeCardFormService.submitAttempt;
    this.judgeCardFormService.init();
    Observable.combineLatest(
      this.judgeCardService.cardListFiltered,
      this.judgeCardFormService.index
    )
      .takeUntil(this.unsubscribe)
      .subscribe(([cardList, index]) => {
        this.card = cardList[index];
        this.isFirst = index === 0;
        this.isLast = index === cardList.length - 1;
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
      this.judgeCardFormService.attemptSubmit();
      return;
    }
    this.judgeCardService.saveJudge(value, code);
    if (this.isLast) {
      return this.router.navigate(['/', 'judge']);
    }
    this.judgeCardFormService.next();
  }

  prev() {
    if (this.isFirst) {
      return;
    }
    if (
      this.formGroup.dirty &&
      !window.confirm(
        '변경사항이 저장되지 않을 수 있습니다. 정말 이동하시겠습니까?'
      )
    ) {
      return;
    }
    this.judgeCardFormService.prev();
  }

  next() {
    if (this.isLast) {
      return;
    }
    if (
      this.formGroup.dirty &&
      !window.confirm(
        '변경사항이 저장되지 않을 수 있습니다. 정말 이동하시겠습니까?'
      )
    ) {
      return;
    }
    this.judgeCardFormService.next();
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
