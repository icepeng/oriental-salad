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
  classValueStats: Observable<{ name: Classes | 'Neutral'; value: number }[]>;
  classPotentialStats: Observable<
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
    this.classValueStats = this.getClassStats('value');
    this.classPotentialStats = this.getClassStats('potential');
  }

  private getClassStats(property: 'value' | 'potential') {
    return this.judgeViewService.cardList.map(cardList => {
      const statSum = cardList.reduce(
        (obj, card) => {
          return {
            ...obj,
            [card.class]: (obj[card.class] || 0) + card.judge[property],
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
        value: statLength[key] ? Math.round(statSum[key] / statLength[key]) : 0,
      }));
    });
  }

  private sortFunc(a: Card, b: Card) {
    return (
      b.judge.value + b.judge.potential - (a.judge.value + a.judge.potential)
    );
  }
}
