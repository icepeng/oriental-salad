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
  valueStat: Observable<{ [key: number]: number; average: number }>;
  potentialStat: Observable<{ [key: number]: number; average: number }>;
  classValueStat: Observable<{ [key in Classes | 'Neutral']: number }>;
  classPotentialStat: Observable<{ [key in Classes | 'Neutral']: number }>;
  bestCards: Observable<Card[]>;
  worstLegendaries: Observable<Card[]>;

  constructor(private judgeViewService: JudgeViewService) {}

  ngOnInit() {
    this.name = this.judgeViewService.name;
    this.valueStat = this.judgeViewService.cardList
      .map(cardList => {
        const stat = cardList.map(card => card.judge).reduce(
          (obj, judge) => {
            return {
              ...obj,
              [judge.value]: obj[judge.value] + 1 / cardList.length * 100,
              average: obj.average + judge.value / cardList.length,
            };
          },
          {
            20: 0,
            30: 0,
            40: 0,
            50: 0,
            60: 0,
            70: 0,
            80: 0,
            average: 0,
          }
        );
        return {
          20: Math.round(stat[20]),
          30: Math.round(stat[30]),
          40: Math.round(stat[40]),
          50: Math.round(stat[50]),
          60: Math.round(stat[60]),
          70: Math.round(stat[70]),
          80: Math.round(stat[80]),
          average: Math.round(stat.average),
        };
      })
      .publishReplay(1)
      .refCount();
    this.potentialStat = this.judgeViewService.cardList
      .map(cardList => {
        const stat = cardList.map(card => card.judge).reduce(
          (obj, judge) => {
            return {
              ...obj,
              [judge.potential]:
                obj[judge.potential] + 1 / cardList.length * 100,
              average: obj.average + judge.potential / cardList.length,
            };
          },
          {
            20: 0,
            30: 0,
            40: 0,
            50: 0,
            60: 0,
            70: 0,
            80: 0,
            average: 0,
          }
        );
        return {
          20: Math.round(stat[20]),
          30: Math.round(stat[30]),
          40: Math.round(stat[40]),
          50: Math.round(stat[50]),
          60: Math.round(stat[60]),
          70: Math.round(stat[70]),
          80: Math.round(stat[80]),
          average: Math.round(stat.average),
        };
      })
      .publishReplay(1)
      .refCount();
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
