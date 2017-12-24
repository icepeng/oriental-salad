import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, publishReplay, refCount, withLatestFrom } from 'rxjs/operators';

import { Card } from '../../core/models/card';
import * as fromRoot from '../../reducers';
import * as FilterAction from '../actions/filter';
import { StatFilter } from '../models/filter';
import * as fromStatViewer from '../reducers';

@Component({
  selector: 'app-stats-summary',
  templateUrl: './stats-summary.component.html',
  styleUrls: ['./stats-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsSummaryComponent implements OnInit {
  bestValue$: Observable<Card>;
  worstValue$: Observable<Card>;
  mostArguedValue$: Observable<Card>;
  bestPotential$: Observable<Card>;
  worstPotential$: Observable<Card>;
  mostArguedPotential$: Observable<Card>;
  mostJudged$: Observable<Card>;
  longestDescription$: Observable<Card>;
  filter$ = this.store.select(fromStatViewer.getFilter);
  list$ = this.store.select(fromStatViewer.getList);
  statList$ = this.store.select(fromRoot.getStatList);

  constructor(private store: Store<fromStatViewer.State>) {}

  ngOnInit() {
    this.bestValue$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (best, card) =>
            statList[best.code].value.mean < statList[card.code].value.mean
              ? card
              : best,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.worstValue$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (worst, card) =>
            statList[worst.code].value.mean > statList[card.code].value.mean
              ? card
              : worst,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.bestPotential$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (best, card) =>
            statList[best.code].potential.mean <
            statList[card.code].potential.mean
              ? card
              : best,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.worstPotential$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (worst, card) =>
            statList[worst.code].potential.mean >
            statList[card.code].potential.mean
              ? card
              : worst,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.mostJudged$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (most, card) =>
            statList[most.code].judgeTotal < statList[card.code].judgeTotal
              ? card
              : most,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.longestDescription$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (longest, card) =>
            +statList[longest.code].descriptionAverage <
            +statList[card.code].descriptionAverage
              ? card
              : longest,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.mostArguedValue$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (most, card) =>
            statList[most.code].value.stdev < statList[card.code].value.stdev
              ? card
              : most,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
    this.mostArguedPotential$ = this.list$.pipe(
      withLatestFrom(this.statList$),
      map(([cardList, statList]) =>
        cardList.reduce(
          (most, card) =>
            statList[most.code].potential.stdev <
            statList[card.code].potential.stdev
              ? card
              : most,
        ),
      ),
      publishReplay(1),
      refCount(),
    );
  }

  onFilterChange(statFilter: StatFilter) {
    this.store.dispatch(new FilterAction.SetFilter({ filter: statFilter }));
  }
}
