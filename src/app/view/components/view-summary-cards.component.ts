import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { Card } from '../../core/models/card';
import { StatList } from '../../core/models/stat';
import { JudgeList } from '../models/judge';

@Component({
  selector: 'app-view-summary-cards',
  templateUrl: './view-summary-cards.component.html',
  styleUrls: ['./view-summary-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSummaryCardsComponent implements OnChanges {
  @Input() cardList: Card[];
  @Input() judgeList: JudgeList;
  @Input() statList: StatList;
  positiveErrors: Card[] = [];
  negativeErrors: Card[] = [];

  constructor() {}

  ngOnChanges() {
    this.positiveErrors = this.cardList
      .filter(
        x =>
          this.judgeList[x.code].value === 80 ||
          this.judgeList[x.code].potential === 80,
      )
      .sort((a, b) => this.errorFunc(b) - this.errorFunc(a))
      .slice(0, 3);

    this.negativeErrors = this.cardList
      .filter(
        x =>
          this.judgeList[x.code].value === 20 ||
          this.judgeList[x.code].potential === 20,
      )
      .sort((a, b) => this.errorFunc(a) - this.errorFunc(b))
      .slice(0, 3);
  }

  private sortFunc = (a: Card, b: Card) =>
    this.judgeList[b.code].value +
    this.judgeList[b.code].potential -
    (this.judgeList[a.code].value + this.judgeList[a.code].potential);

  private errorFunc = (card: Card) =>
    this.judgeList[card.code].value -
    +this.statList[card.code].hsreplay.value +
    this.judgeList[card.code].potential -
    +this.statList[card.code].hsreplay.potential;
}
