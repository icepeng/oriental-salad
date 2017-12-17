import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card, Classes } from '../../card';
import { JudgeViewService } from '../judge-view.service';
import { JudgeInfo } from '../judgment';

@Component({
  selector: 'app-judge-view-summary',
  templateUrl: './judge-view-summary.component.html',
  styleUrls: ['./judge-view-summary.component.scss'],
})
export class JudgeViewSummaryComponent implements OnInit {
  data: Observable<JudgeInfo>;
  cardList: Observable<Card[]>;
  valueStats: Observable<{ name: string; value: number }[]>;
  potentialStats: Observable<{ name: string; value: number }[]>;
  classValueStat: Observable<{ [key in Classes | 'Neutral']: number }>;
  classPotentialStat: Observable<{ [key in Classes | 'Neutral']: number }>;

  constructor(private judgeViewService: JudgeViewService) {}

  ngOnInit() {
    this.data = this.judgeViewService.data;
    this.cardList = this.judgeViewService.cardList;
    this.valueStats = this.judgeViewService.cardList.map(cardList =>
      [20, 30, 40, 50, 60, 70, 80].map(x => {
        return {
          name: x.toString(),
          value: cardList.filter(card => card.judge.value === x).length,
        };
      }),
    );
    this.potentialStats = this.judgeViewService.cardList.map(cardList =>
      [20, 30, 40, 50, 60, 70, 80].map(x => {
        return {
          name: x.toString(),
          value: cardList.filter(card => card.judge.potential === x).length,
        };
      }),
    );
    this.classValueStat = this.judgeViewService.cardList
      .map(cardList => {
        const statSum = cardList.reduce(
          (obj, card) => {
            return {
              ...obj,
              [card.class]: (obj[card.class] || 0) + card.judge.value,
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
        return Object.keys(statSum).reduce(
          (obj, key) => ({
            ...obj,
            [key]: Math.round(statSum[key] / statLength[key]),
          }),
          {} as { [key in Classes]: number },
        );
      })
      .publishReplay(1)
      .refCount();
    this.classPotentialStat = this.judgeViewService.cardList
      .map(cardList => {
        const statSum = cardList.reduce(
          (obj, card) => {
            return {
              ...obj,
              [card.class]: (obj[card.class] || 0) + card.judge.potential,
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
        return Object.keys(statSum).reduce(
          (obj, key) => ({
            ...obj,
            [key]: Math.round(statSum[key] / statLength[key]),
          }),
          {} as { [key in Classes]: number },
        );
      })
      .publishReplay(1)
      .refCount();
  }

  private sortFunc(a: Card, b: Card) {
    return (
      b.judge.value + b.judge.potential - (a.judge.value + a.judge.potential)
    );
  }
}
