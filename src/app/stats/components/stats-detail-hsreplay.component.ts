import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { HSReplayStat } from '../../core/models/stat';

@Component({
  selector: 'app-stats-detail-hsreplay',
  templateUrl: './stats-detail-hsreplay.component.html',
  styleUrls: ['./stats-detail-hsreplay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsDetailHsreplayComponent implements OnInit {
  @Input() hsreplay: HSReplayStat;

  constructor() {}

  ngOnInit() {}

  openHSReplay(url: string) {
    window.open(`https://hsreplay.net${url}`, '_blank');
  }
}
