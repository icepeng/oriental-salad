import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { JudgeViewService } from '../judge-view.service';

@Component({
  selector: 'app-judge-view-user',
  templateUrl: './judge-view-user.component.html',
  styleUrls: ['./judge-view-user.component.scss'],
})
export class JudgeViewUserComponent implements OnInit, OnDestroy {
  state: 'SUMMARY' | 'LIST' = 'SUMMARY';
  name: Observable<string>;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private judgeViewService: JudgeViewService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.takeUntil(this.unsubscribe).subscribe(async params => {
      await this.judgeViewService.getJudge(params['id']);
    });
    this.name = this.judgeViewService.name;
  }

  toList() {
    this.state = 'LIST';
  }

  toSummary() {
    this.state = 'SUMMARY';
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
