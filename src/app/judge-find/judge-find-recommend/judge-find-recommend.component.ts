import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { JudgeFindRecommendService } from './judge-find-recommend.service';
import { Stat } from './stat';

@Component({
  selector: 'app-judge-find-recommend',
  templateUrl: './judge-find-recommend.component.html',
  styleUrls: ['./judge-find-recommend.component.scss'],
})
export class JudgeFindRecommendComponent implements OnInit, OnDestroy {
  stats: Stat;
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private judgeFindRecommendService: JudgeFindRecommendService) {}

  ngOnInit() {
    this.judgeFindRecommendService
      .getStats()
      .takeUntil(this.unsubscribe)
      .subscribe(stats => (this.stats = stats));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
