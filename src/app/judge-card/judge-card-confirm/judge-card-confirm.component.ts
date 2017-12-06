import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Card } from 'app/card';
import { JudgeCardService } from '../judge-card.service';

@Component({
  selector: 'app-judge-card-confirm',
  templateUrl: './judge-card-confirm.component.html',
  styleUrls: ['./judge-card-confirm.component.scss'],
})
export class JudgeCardConfirmComponent implements OnInit, OnDestroy {
  list: Card[];
  formGroup: FormGroup;
  submitFail = false;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private judgeCardService: JudgeCardService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
    });
    this.judgeCardService.cardListJudged
      .takeUntil(this.unsubscribe)
      .subscribe(list => (this.list = list));
  }

  async onSubmit(value: { name: string }) {
    try {
      const id = await this.judgeCardService.submit(this.list, value.name);
      this.router.navigate(['/', 'judge', 'result', id]);
    } catch (err) {
      this.submitFail = true;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
