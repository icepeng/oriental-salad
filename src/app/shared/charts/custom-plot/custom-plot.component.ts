import { Component, Input, OnInit } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-custom-plot',
  templateUrl: './custom-plot.component.html',
  styleUrls: ['./custom-plot.component.scss'],
})
export class CustomPlotComponent implements OnInit, OnChanges {
  @Input()
  stats: {
    [variable: string]: number;
  };
  @Input()
  hsreplay: number | null = null;
  min = 20;
  max = 80;
  step = 10;
  ticks: number[] = [];
  median: number;
  mean: number;
  q1: number;
  q3: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.ticks = [];
    for (let x = this.min; x <= this.max; x += this.step) {
      this.ticks.push(x);
    }
    const total = this.ticks.reduce((sum, x) => sum + this.stats[x], 0);
    this.median = this.getValueFromRatio(total, 0.5);
    this.q1 = this.getValueFromRatio(total, 0.25);
    this.q3 = this.getValueFromRatio(total, 0.75);
    this.mean =
      this.ticks.reduce((sum, x) => sum + this.stats[x] * x, 0) / total;
  }

  getValueFromRatio(total: number, ratio: number) {
    return this.ticks.reduce(
      (obj, x) => {
        if (obj.sum === total * ratio) {
          return {
            sum: obj.sum + this.stats[x],
            value: (x + obj.value) / 2,
          };
        }
        if (obj.sum > total * ratio) {
          return {
            sum: obj.sum + this.stats[x],
            value: obj.value,
          };
        }
        return {
          sum: obj.sum + this.stats[x],
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
