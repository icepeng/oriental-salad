import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, withLatestFrom } from 'rxjs/operators';

import { Classes } from '../../core/models/card';
import * as fromRoot from '../../reducers';
import * as fromView from '../reducers';

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSummaryComponent implements OnInit {
  user$ = this.store.select(fromView.getUser);
  cardList$ = this.store.select(fromView.getCards);
  judgeList$ = this.store.select(fromView.getJudgeList);
  statList$ = this.store.select(fromRoot.getStatList);
  valueStats$: Observable<{ name: string; value: number }[]>;
  potentialStats$: Observable<{ name: string; value: number }[]>;
  classValueStats$: Observable<{ name: Classes | 'Neutral'; value: number }[]>;
  classPotentialStats$: Observable<
    { name: Classes | 'Neutral'; value: number }[]
  >;
  customColors = [
    { name: 'DRUID', value: '#ff7d0a' },
    { name: 'MAGE', value: '#69ccf0' },
    { name: 'HUNTER', value: '#abd473' },
    { name: 'ROGUE', value: '#fff569' },
    { name: 'WARRIOR', value: '#c79c6e' },
    { name: 'WARLOCK', value: '#9482c9' },
    { name: 'SHAMAN', value: '#0070de' },
    { name: 'PREIST', value: '#aaaaaa' },
    { name: 'PALADIN', value: '#f58cba' },
    { name: 'NEUTRAL', value: '#000000' },
  ];

  constructor(private store: Store<fromView.ViewState>) {}

  ngOnInit() {
    this.valueStats$ = this.cardList$.pipe(
      withLatestFrom(this.judgeList$),
      map(([cardList, judgeList]) =>
        [20, 30, 40, 50, 60, 70, 80].map(x => {
          return {
            name: x.toString(),
            value: cardList.filter(card => judgeList[card.code].value === x)
              .length,
          };
        }),
      ),
    );
    this.potentialStats$ = this.cardList$.pipe(
      withLatestFrom(this.judgeList$),
      map(([cardList, judgeList]) =>
        [20, 30, 40, 50, 60, 70, 80].map(x => {
          return {
            name: x.toString(),
            value: cardList.filter(card => judgeList[card.code].potential === x)
              .length,
          };
        }),
      ),
    );
    this.classValueStats$ = this.getClassStats('value');
    this.classPotentialStats$ = this.getClassStats('potential');
  }

  private getClassStats(property: 'value' | 'potential') {
    return this.cardList$.pipe(
      withLatestFrom(this.judgeList$),
      map(([cardList, judgeList]) => {
        const statSum = cardList.reduce(
          (obj, card) => {
            return {
              ...obj,
              [card.class]:
                (obj[card.class] || 0) + judgeList[card.code][property],
            };
          },
          {} as { [key in Classes]: number },
        );
        const statLength = cardList.reduce(
          (obj, card) => {
            return {
              ...obj,
              [card.class]: (obj[card.class] || 0) + 1,
            };
          },
          {} as { [key in Classes]: number },
        );
        return [
          'Druid',
          'Mage',
          'Hunter',
          'Rogue',
          'Warrior',
          'Warlock',
          'Shaman',
          'Preist',
          'Paladin',
          'Neutral',
        ].map((key: Classes | 'Neutral') => ({
          name: key,
          value: statLength[key]
            ? Math.round(statSum[key] / statLength[key])
            : 0,
        }));
      }),
    );
  }
}
