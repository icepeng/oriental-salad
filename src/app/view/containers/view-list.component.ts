import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { Card } from '../../core/models/card';
import * as FilterAction from '../actions/filter';
import { ViewFilter } from '../models/filter';
import * as fromView from '../reducers';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewListComponent implements OnInit {
  list$: Observable<Card[]>;
  judgeList$ = this.store.select(fromView.getJudgeList);
  viewLimit$ = this.store.select(fromView.getViewLimit);
  filter$ = this.store.select(fromView.getFilter);
  user$ = this.store.select(fromView.getUser);
  showExpandButton$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromView.State>,
  ) {}

  ngOnInit() {
    const list$ = this.store.select(fromView.getList);
    this.list$ = combineLatest(this.viewLimit$, list$).pipe(
      map(([viewLimit, list]) => [...list].slice(0, viewLimit)),
    );
    this.showExpandButton$ = combineLatest(this.viewLimit$, list$).pipe(
      map(([viewLimit, list]) => viewLimit < list.length),
    );
  }

  onClick(item: Card) {
    this.router.navigate(['./', item.code], { relativeTo: this.route });
  }

  moreCards() {
    this.store.dispatch(new FilterAction.ExpandLimit());
  }

  onFilterChange(viewFilter: ViewFilter) {
    this.store.dispatch(new FilterAction.SetFilter({ filter: viewFilter }));
  }
}
