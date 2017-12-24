import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Stat } from '../../core/models/stat';

@Component({
  selector: 'app-stats-detail-numbers',
  templateUrl: './stats-detail-numbers.component.html',
  styleUrls: ['./stats-detail-numbers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsDetailNumbersComponent implements OnInit {
  @Input() stat: Stat;

  constructor() {}

  ngOnInit() {}
}
