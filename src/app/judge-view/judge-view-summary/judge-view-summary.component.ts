import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card, Classes } from '../../card';
import { JudgeViewService } from '../judge-view.service';

@Component({
  selector: 'app-judge-view-summary',
  templateUrl: './judge-view-summary.component.html',
  styleUrls: ['./judge-view-summary.component.scss'],
})
export class JudgeViewSummaryComponent implements OnInit {
  name: Observable<string>;
  valueStat: Observable<{ name: string; value: number }[]>;
  potentialStat: Observable<{ name: string; value: number }[]>;
  classValueStat: Observable<{ [key in Classes | 'Neutral']: number }>;
  classPotentialStat: Observable<{ [key in Classes | 'Neutral']: number }>;
  bestCards: Observable<Card[]>;
  worstLegendaries: Observable<Card[]>;

  constructor(private judgeViewService: JudgeViewService) {}

  ngOnInit() {
    this.name = this.judgeViewService.name;
    this.valueStat = this.judgeViewService.cardList.map(cardList =>
      [20, 30, 40, 50, 60, 70, 80].map(x => {
        return {
          name: x.toString(),
          value: cardList.filter(card => card.judge.value === x).length,
        };
      }),
    );
    this.potentialStat = this.judgeViewService.cardList.map(cardList =>
      [20, 30, 40, 50, 60, 70, 80].map(x => {
        return {
          name: x.toString(),
          value: cardList.filter(card => card.judge.value === x).length,
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
    this.bestCards = this.judgeViewService.cardList
      .map(cardList => {
        const sortedList = cardList.sort((a, b) => {
          const res = this.sortFunc(a, b);
          return res !== 0
            ? res
            : b.judge.description.length - a.judge.description.length;
        });
        return [sortedList[0], sortedList[1], sortedList[2]];
      })
      .publishReplay(1)
      .refCount();
    this.worstLegendaries = this.judgeViewService.cardList
      .map(cardList => {
        const sortedList = cardList
          .filter(card => card.rarity === 'Legendary')
          .sort((a, b) => {
            const res = this.sortFunc(b, a);
            return res !== 0
              ? res
              : b.judge.description.length - a.judge.description.length;
          });
        return [sortedList[0], sortedList[1], sortedList[2]];
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
