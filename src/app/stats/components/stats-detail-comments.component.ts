import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Comments } from '../models/comment';

@Component({
  selector: 'app-stats-detail-comments',
  templateUrl: './stats-detail-comments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsDetailCommentsComponent implements OnInit {
  @Input() comments: Comments;
  @Output() refresh = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onRefresh() {
    this.refresh.emit();
  }
}
