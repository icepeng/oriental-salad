import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { Card } from '../../../card';

@Component({
  selector: 'app-judge-view-summary-cards',
  templateUrl: './judge-view-summary-cards.component.html',
  styleUrls: ['./judge-view-summary-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JudgeViewSummaryCardsComponent implements OnChanges {
  @Input() cardList: Card[];
  positiveErrors: Card[] = [];
  negativeErrors: Card[] = [];

  constructor() {}

  ngOnChanges() {
    this.positiveErrors = this.cardList
      .filter(x => x.judge.value === 80 || x.judge.potential === 80)
      .sort((a, b) => this.errorFunc(b) - this.errorFunc(a))
      .slice(0, 3);

    this.negativeErrors = this.cardList
      .filter(x => x.judge.value === 20 || x.judge.potential === 20)
      .sort((a, b) => this.errorFunc(a) - this.errorFunc(b))
      .slice(0, 3);
  }

  private sortFunc = (a: Card, b: Card) =>
    b.judge.value + b.judge.potential - (a.judge.value + a.judge.potential);

  private errorFunc = (card: Card) =>
    card.judge.value -
    +card.stats.hsreplay.value +
    card.judge.potential -
    +card.stats.hsreplay.potential;
}
