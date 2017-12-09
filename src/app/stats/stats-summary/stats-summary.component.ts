import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CardStat } from '../stats';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats-summary',
  templateUrl: './stats-summary.component.html',
  styleUrls: ['./stats-summary.component.scss'],
})
export class StatsSummaryComponent implements OnInit {
  bestValue: Observable<CardStat>;
  worstValue: Observable<CardStat>;
  mostArguedValue: Observable<CardStat>;
  bestPotential: Observable<CardStat>;
  worstPotential: Observable<CardStat>;
  mostArguedPotential: Observable<CardStat>;
  mostJudged: Observable<CardStat>;
  longestDescription: Observable<CardStat>;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.bestValue = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (best, card) =>
            best.stats.value.mean < card.stats.value.mean ? card : best,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.worstValue = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (worst, card) =>
            worst.stats.value.mean > card.stats.value.mean ? card : worst,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.bestPotential = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (best, card) =>
            best.stats.potential.mean < card.stats.potential.mean ? card : best,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.worstPotential = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (worst, card) =>
            worst.stats.potential.mean > card.stats.potential.mean
              ? card
              : worst,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.mostJudged = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (most, card) =>
            most.stats.judgeTotal < card.stats.judgeTotal ? card : most,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.longestDescription = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (longest, card) =>
            +longest.stats.descriptionAverage < +card.stats.descriptionAverage
              ? card
              : longest,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.mostArguedValue = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (most, card) =>
            most.stats.value.stdev < card.stats.value.stdev ? card : most,
        ),
      )
      .publishReplay(1)
      .refCount();
    this.mostArguedPotential = this.statsService.cardList
      .map(cardList =>
        cardList.reduce(
          (most, card) =>
            most.stats.potential.stdev < card.stats.potential.stdev
              ? card
              : most,
        ),
      )
      .publishReplay(1)
      .refCount();
  }
}
