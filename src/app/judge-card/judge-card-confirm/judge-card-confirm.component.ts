import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { Card } from '../../core/card';
import { JudgeCardService } from '../judge-card.service';

@Component({
  selector: 'app-judge-card-confirm',
  templateUrl: './judge-card-confirm.component.html',
  styleUrls: ['./judge-card-confirm.component.scss'],
})
export class JudgeCardConfirmComponent implements OnInit, OnDestroy {
  list: Card[];
  name: string;
  submitFail = false;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private judgeCardService: JudgeCardService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.judgeCardService.cardListJudged
      .takeUntil(this.unsubscribe)
      .subscribe(list => (this.list = list));
  }

  async onSubmit() {
    try {
      const id = await this.judgeCardService.submit(this.list, this.name);
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
