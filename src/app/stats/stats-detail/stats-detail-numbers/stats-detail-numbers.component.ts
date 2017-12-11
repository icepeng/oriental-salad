import { Component, Input, OnInit } from '@angular/core';

import { CardStat } from '../../stats';

@Component({
  selector: 'app-stats-detail-numbers',
  templateUrl: './stats-detail-numbers.component.html',
  styleUrls: ['./stats-detail-numbers.component.scss'],
})
export class StatsDetailNumbersComponent implements OnInit {
  @Input() card: CardStat;

  constructor() {}

  ngOnInit() {}
}
