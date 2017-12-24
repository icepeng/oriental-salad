import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Card } from '../../core/models/card';
import { HSReplayStat } from '../../core/models/stat';
import { Judge } from '../models/judge';

@Component({
  selector: 'app-card-frame',
  templateUrl: './card-frame.component.html',
  styleUrls: ['./card-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFrameComponent implements OnInit {
  @Input() card: Card;
  @Input() judge: Judge;
  @Input() hsreplay: HSReplayStat;

  constructor() {}

  ngOnInit() {}
}
