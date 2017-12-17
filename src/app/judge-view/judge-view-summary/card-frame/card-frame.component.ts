import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Card } from '../../../card';

@Component({
  selector: 'app-card-frame',
  templateUrl: './card-frame.component.html',
  styleUrls: ['./card-frame.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFrameComponent implements OnInit {
  @Input() card: Card;

  constructor() {}

  ngOnInit() {}
}
