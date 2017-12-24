import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, retryWhen, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { Card } from '../../core/models/card';
import { Stat } from '../../core/models/stat';
import * as fromRoot from '../../reducers';
import * as FilterAction from '../actions/filter';
import { Judge } from '../models/judge';
import * as fromView from '../reducers';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDetailComponent implements OnInit, OnDestroy {
  info$: Observable<{
    index: number;
    total: number;
    isFirst: boolean;
    isLast: boolean;
  }>;
  card$: Observable<Card>;
  stat$: Observable<Stat>;
  judge$: Observable<Judge>;
  matchRate$: Observable<number>;
  user$ = this.store.select(fromView.getUser);
  prevClick$: Subject<void> = new Subject();
  nextClick$: Subject<void> = new Subject();
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromView.ViewState>,
  ) {}

  ngOnInit() {
    const cardList$ = this.store.select(fromView.getList);
    const judgeList$ = this.store.select(fromView.getJudgeList);
    const statList$ = this.store.select(fromRoot.getStatList);
    const selectedCard$ = this.route.params.pipe(
      withLatestFrom(cardList$),
      map(([params, cardList]) => {
        const index = cardList.findIndex(item => item.code === params['cardId']);
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
    this.judge$ = this.card$.pipe(
      withLatestFrom(judgeList$),
      map(([card, judgeList]) => judgeList[card.code]),
    );
    this.matchRate$ = this.judge$.pipe(
      withLatestFrom(this.stat$),
      map(
        ([judge, stat]) =>
          720 / 7 -
          ((judge.value - +stat.hsreplay.value) *
            (judge.value - +stat.hsreplay.value) +
            (judge.potential - +stat.hsreplay.potential) *
              (judge.potential - +stat.hsreplay.potential)) /
            17.5,
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
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
