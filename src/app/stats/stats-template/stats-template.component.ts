import { Component, Input, OnInit } from '@angular/core';

import { CardStat } from '../stats';

@Component({
  selector: 'app-stats-template',
  templateUrl: './stats-template.component.html',
  styleUrls: ['./stats-template.component.scss'],
})
export class StatsTemplateComponent implements OnInit {
  @Input() title: string;
  @Input() card: CardStat;
  @Input() meanValue = false;
  @Input() meanPotential = false;
  @Input() stdevValue = false;
  @Input() stdevPotential = false;
  @Input() descriptionAverage = false;
  @Input() judgeTotal = false;

  constructor() {}

  ngOnInit() {}
}
