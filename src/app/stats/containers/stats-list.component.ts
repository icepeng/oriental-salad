import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { Card } from '../../core/models/card';
import * as fromRoot from '../../reducers';
import * as FilterAction from '../actions/filter';
import { StatFilter } from '../models/filter';
import * as fromStatViewer from '../reducers';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsListComponent implements OnInit {
  list$: Observable<Card[]>;
  statList$ = this.store.select(fromRoot.getStatList);
  viewLimit$ = this.store.select(fromStatViewer.getViewLimit);
  showExpandButton$: Observable<boolean>;
  filter$ = this.store.select(fromStatViewer.getFilter);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStatViewer.State>,
  ) {}

  ngOnInit() {
    const list$ = this.store.select(fromStatViewer.getList);
    this.list$ = combineLatest(this.viewLimit$, list$).pipe(
      map(([viewLimit, list]) => [...list].slice(0, viewLimit)),
    );
    this.showExpandButton$ = combineLatest(this.viewLimit$, list$).pipe(
      map(([viewLimit, list]) => viewLimit < list.length),
    );
  }

  onClick(item: Card) {
    this.router.navigate(['../', item.code], { relativeTo: this.route });
  }

  moreCards() {
    this.store.dispatch(new FilterAction.ExpandLimit());
  }

  onFilterChange(statFilter: StatFilter) {
    this.store.dispatch(new FilterAction.SetFilter({ filter: statFilter }));
  }
}
