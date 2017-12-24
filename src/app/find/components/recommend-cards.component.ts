import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UserStat } from '../models/stat';

@Component({
  selector: 'app-recommend-cards',
  templateUrl: './recommend-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendCardsComponent {
  @Input() stat: UserStat;

  constructor() {}
}
