import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import * as StatAction from '../actions/stat';
import * as fromFind from '../reducers';

@Component({
  selector: 'app-find-recommend',
  templateUrl: './find-recommend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendComponent implements OnInit {
  stat$ = this.store.select(fromFind.getStat);
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<fromFind.FindState>) {}

  ngOnInit() {
    this.store.dispatch(new StatAction.Load());
  }
}
