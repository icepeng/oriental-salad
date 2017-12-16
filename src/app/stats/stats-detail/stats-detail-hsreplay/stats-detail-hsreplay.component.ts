import { HSReplayStat } from '../../stats';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-detail-hsreplay',
  templateUrl: './stats-detail-hsreplay.component.html',
  styleUrls: ['./stats-detail-hsreplay.component.scss'],
})
export class StatsDetailHsreplayComponent implements OnInit {
  @Input() hsreplay: HSReplayStat;

  constructor() {}

  ngOnInit() {}

  openHSReplay(url: string) {
    window.open(`https://hsreplay.net${url}`, '_blank');
  }
}
