import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { JudgeViewService } from '../judge-view.service';

@Component({
  selector: 'app-judge-view-summary',
  templateUrl: './judge-view-summary.component.html',
  styleUrls: ['./judge-view-summary.component.scss'],
})
export class JudgeViewSummaryComponent implements OnInit {
  valueStat: Observable<{ [key: number]: number; average: number }>;
  potentialStat: Observable<{ [key: number]: number; average: number }>;

  constructor(private judgeViewService: JudgeViewService) {}

  ngOnInit() {
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
  }
}
