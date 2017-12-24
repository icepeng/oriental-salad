import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, retryWhen, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Card } from '../../core/models/card';
import { Stat } from '../../core/models/stat';
import * as fromRoot from '../../reducers';
import * as CommentAction from '../actions/comment';
import * as FilterAction from '../actions/filter';
import * as fromStatViewer from '../reducers';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './stats-detail.component.html',
  styleUrls: ['./stats-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsDetailComponent implements OnInit, OnDestroy {
  info$: Observable<{
    index: number;
    total: number;
    isFirst: boolean;
    isLast: boolean;
  }>;
  card$: Observable<Card>;
  stat$: Observable<Stat>;
  comments$ = this.store.select(fromStatViewer.getComments);
  valueStats$: Observable<{ name: string; value: number }[]>;
  potentialStats$: Observable<{ name: string; value: number }[]>;
  refresh$: Subject<void> = new Subject();
  unsubscribe$: Subject<void> = new Subject<void>();
  prevClick$: Subject<void> = new Subject();
  nextClick$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromStatViewer.State>,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const cardList$ = this.store.select(fromStatViewer.getList);
    const statList$ = this.store.select(fromRoot.getStatList);
    const selectedCard$ = this.route.params.pipe(
      withLatestFrom(cardList$),
      map(([params, cardList]) => {
        const index = cardList.findIndex(item => item.code === params['id']);
        if (index === -1) {
          throw new Error('No Index');
        }
        return {
          index,
          total: cardList.length,
          card: cardList[index],
        };
      }),
      retryWhen(err$ =>
        err$.pipe(
          tap(() => this.store.dispatch(new FilterAction.ResetFilter())),
        ),
      ),
    );
    this.info$ = selectedCard$.pipe(
      map(x => ({
        index: x.index,
        total: x.total,
        isFirst: x.index === 0,
        isLast: x.index === x.total - 1,
      })),
    );
    this.card$ = selectedCard$.pipe(map(x => x.card));
    this.stat$ = this.card$.pipe(
      withLatestFrom(statList$),
      map(([card, statList]) => statList[card.code]),
    );

    this.valueStats$ = this.card$.pipe(
      withLatestFrom(statList$),
      map(([card, statList]) =>
        [20, 30, 40, 50, 60, 70, 80].map(x => ({
          name: x.toString(),
          value: statList[card.code].value[x],
        })),
      ),
    );
    this.potentialStats$ = this.card$.pipe(
      withLatestFrom(statList$),
      map(([card, statList]) =>
        [20, 30, 40, 50, 60, 70, 80].map(x => ({
          name: x.toString(),
          value: statList[card.code].potential[x],
        })),
      ),
    );

    this.nextClick$
      .pipe(withLatestFrom(this.info$, cardList$), takeUntil(this.unsubscribe$))
      .subscribe(([_, info, cardList]) => {
        if (info.isLast) {
          return;
        }
        this.router.navigate(['../', cardList[info.index + 1].code], {
          relativeTo: this.route,
        });
      });

    this.prevClick$
      .pipe(withLatestFrom(this.info$, cardList$), takeUntil(this.unsubscribe$))
      .subscribe(([_, info, cardList]) => {
        if (info.isFirst) {
          return;
        }
        this.router.navigate(['../', cardList[info.index - 1].code], {
          relativeTo: this.route,
        });
      });

    combineLatest(this.route.params, this.refresh$)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([params]) =>
        this.store.dispatch(new CommentAction.Load({ cardCode: params['id'] })),
      );
    this.refresh$.next();
  }

  refresh() {
    this.refresh$.next();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
