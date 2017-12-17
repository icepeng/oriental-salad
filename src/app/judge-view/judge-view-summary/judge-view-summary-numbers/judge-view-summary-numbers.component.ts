import { JudgeInfo } from '../../judgment';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { Card } from '../../../card';

@Component({
  selector: 'app-judge-view-summary-numbers',
  templateUrl: './judge-view-summary-numbers.component.html',
  styleUrls: ['./judge-view-summary-numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JudgeViewSummaryNumbersComponent implements OnChanges {
  @Input() cardList: Card[];
  @Input() judgeInfo: JudgeInfo;
  meanValue: number;
  stdevValue: number;
  meanPotential: number;
  stdevPotential: number;
  total: number;
  descriptionLength: number;

  constructor() {}

  ngOnChanges() {
    const valueList = this.cardList.map(card => card.judge.value);
    const potentialList = this.cardList.map(card => card.judge.potential);
    this.meanValue =
      valueList.reduce((sum, x) => sum + x, 0) / this.cardList.length;
    this.meanPotential =
      potentialList.reduce((sum, x) => sum + x, 0) / this.cardList.length;
    this.stdevValue = this.cardList.length > 1 ? Math.sqrt(
      valueList.reduce(
        (sum, x) => sum + (this.meanValue - x) * (this.meanValue - x),
        0,
      ) /
        (this.cardList.length - 1),
    ) : 0;
    this.stdevPotential = this.cardList.length > 1 ? Math.sqrt(
      valueList.reduce(
        (sum, x) => sum + (this.meanPotential - x) * (this.meanPotential - x),
        0,
      ) /
        (this.cardList.length - 1),
    ) : 0;
    this.total = this.cardList.length;
    this.descriptionLength = this.cardList.reduce(
      (sum, card) => sum + card.judge.description.length,
      0,
    );
  }
}
