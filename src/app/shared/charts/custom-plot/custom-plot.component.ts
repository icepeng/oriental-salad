import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Stat, StatElement } from '../../../core/models/stat';

@Component({
  selector: 'app-custom-plot',
  templateUrl: './custom-plot.component.html',
  styleUrls: ['./custom-plot.component.scss'],
})
export class CustomPlotComponent implements OnInit, OnChanges {
  @Input() stat: Stat;
  @Input() element: 'value' | 'potential';
  min = 20;
  max = 80;
  step = 10;
  ticks = [20, 30, 40, 50, 60, 70, 80];
  mean: number;
  q1: number;
  q3: number;
  hsreplay: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    const total = this.ticks.reduce(
      (sum, x) => sum + this.stat[this.element][x],
      0,
    );
    this.q1 = this.getValueFromRatio(total, 0.25, this.stat[this.element]);
    this.q3 = this.getValueFromRatio(total, 0.75, this.stat[this.element]);
    this.mean =
      this.ticks.reduce((sum, x) => sum + this.stat[this.element][x] * x, 0) /
      total;
    this.hsreplay = +this.stat.hsreplay[this.element];
  }

  getValueFromRatio(total: number, ratio: number, element: StatElement) {
    return this.ticks.reduce(
      (obj, x) => {
        if (obj.sum === total * ratio) {
          return {
            sum: obj.sum + element[x],
            value: (x + obj.value) / 2,
          };
        }
        if (obj.sum > total * ratio) {
          return {
            sum: obj.sum + element[x],
            value: obj.value,
          };
        }
        return {
          sum: obj.sum + element[x],
          value: x,
        };
      },
      {
        sum: 0,
        value: 0,
      },
    ).value;
  }

  toPercent(x: number) {
    return (x - this.min) / (this.max - this.min) * 100;
  }

  toAbsolute(x: number) {
    return x / 100 * (this.max - this.min) + this.min;
  }
}
