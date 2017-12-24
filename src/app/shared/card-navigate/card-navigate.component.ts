import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Card } from '../../core/models/card';

@Component({
  selector: 'app-card-navigate',
  templateUrl: './card-navigate.component.html',
  styleUrls: ['./card-navigate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNavigateComponent implements OnInit {
  @Input()
  info: { total: number; index: number; isFirst: boolean; isLast: boolean };
  @Input() card: Card;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
