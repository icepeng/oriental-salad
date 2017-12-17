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
  bestCards: Card[];
  worstLegendaries: Card[];

  constructor() {}

  ngOnChanges() {
    const sortedList = this.cardList.sort((a, b) => {
      const res = this.sortFunc(a, b);
      return res !== 0
        ? res
        : b.judge.description.length - a.judge.description.length;
    });
    this.bestCards = [sortedList[0], sortedList[1], sortedList[2]];

    const sortedLegendary = this.cardList
      .filter(card => card.rarity === 'Legendary')
      .sort((a, b) => {
        const res = this.sortFunc(b, a);
        return res !== 0
          ? res
          : b.judge.description.length - a.judge.description.length;
      });
    this.worstLegendaries = [
      sortedLegendary[0],
      sortedLegendary[1],
      sortedLegendary[2],
    ];
  }

  private sortFunc(a: Card, b: Card) {
    return (
      b.judge.value + b.judge.potential - (a.judge.value + a.judge.potential)
    );
  }
}
