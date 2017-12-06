import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Card, Classes } from '../../card';
import { JudgeViewService } from '../judge-view.service';

@Component({
  selector: 'app-judge-view-summary',
  templateUrl: './judge-view-summary.component.html',
  styleUrls: ['./judge-view-summary.component.scss'],
})
export class JudgeViewSummaryComponent implements OnInit, OnDestroy {
  name: Observable<string>;
  valueStat: Observable<{ [key: number]: number; average: number }>;
  potentialStat: Observable<{ [key: number]: number; average: number }>;
  classValueStat: Observable<{ [key in Classes]: number }>;
  classPotentialStat: Observable<{ [key in Classes]: number }>;
  bestCards: Card[];
  worstLegendaries: Card[];
  unsubscribe: Subject<void> = new Subject<void>();

  constructor(private judgeViewService: JudgeViewService) {}

  ngOnInit() {
    this.name = this.judgeViewService.name;
    this.valueStat = this.judgeViewService.cardList.map(cardList => {
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
    });
    this.potentialStat = this.judgeViewService.cardList.map(cardList => {
      const stat = cardList.map(card => card.judge).reduce(
        (obj, judge) => {
          return {
            ...obj,
            [judge.potential]: obj[judge.potential] + 1 / cardList.length * 100,
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
    });
    this.classValueStat = this.judgeViewService.cardList.map(cardList => {
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
    });
    this.classPotentialStat = this.judgeViewService.cardList.map(cardList => {
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
    });
    this.judgeViewService.cardList
      .takeUntil(this.unsubscribe)
      .subscribe(cardList => {
        const sortedList = cardList.sort(
          (a, b) =>
            b.judge.value +
            b.judge.potential -
            (a.judge.value + a.judge.potential),
        );
        this.bestCards = [sortedList[0], sortedList[1], sortedList[2]];
      });
    this.judgeViewService.cardList
      .takeUntil(this.unsubscribe)
      .subscribe(cardList => {
        const sortedList = cardList
          .filter(card => card.rarity === 'Legendary')
          .sort(
            (a, b) =>
              a.judge.value +
              a.judge.potential -
              (b.judge.value + b.judge.potential),
          );
        this.worstLegendaries = [sortedList[0], sortedList[1], sortedList[2]];
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
