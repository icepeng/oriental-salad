import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { Card } from '../../core/models/card';
import { JudgeList } from '../models/judge';
import { User } from '../models/user';

@Component({
  selector: 'app-view-summary-numbers',
  templateUrl: './view-summary-numbers.component.html',
  styleUrls: ['./view-summary-numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSummaryNumbersComponent implements OnChanges {
  @Input() cardList: Card[];
  @Input() judgeList: JudgeList;
  @Input() user: User;
  meanValue: number;
  stdevValue: number;
  meanPotential: number;
  stdevPotential: number;
  total: number;
  descriptionLength: number;

  constructor() {}

  ngOnChanges() {
    const valueList = this.cardList.map(
      card => this.judgeList[card.code].value,
    );
    const potentialList = this.cardList.map(
      card => this.judgeList[card.code].potential,
    );
    this.meanValue =
      valueList.reduce((sum, x) => sum + x, 0) / this.cardList.length;
    this.meanPotential =
      potentialList.reduce((sum, x) => sum + x, 0) / this.cardList.length;
    this.stdevValue =
      this.cardList.length > 1
        ? Math.sqrt(
            valueList.reduce(
              (sum, x) => sum + (this.meanValue - x) * (this.meanValue - x),
              0,
            ) /
              (this.cardList.length - 1),
          )
        : 0;
    this.stdevPotential =
      this.cardList.length > 1
        ? Math.sqrt(
            valueList.reduce(
              (sum, x) =>
                sum + (this.meanPotential - x) * (this.meanPotential - x),
              0,
            ) /
              (this.cardList.length - 1),
          )
        : 0;
    this.total = this.cardList.length;
    this.descriptionLength = this.cardList.reduce(
      (sum, card) => sum + this.judgeList[card.code].description.length,
      0,
    );
  }
}
