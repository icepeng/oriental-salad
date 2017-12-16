import { StatDetail } from '../../stats';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stats-detail-users',
  templateUrl: './stats-detail-users.component.html',
  styleUrls: ['./stats-detail-users.component.scss'],
})
export class StatsDetailUsersComponent implements OnInit {
  @Input() statsDetail: StatDetail;
  @Output() refresh = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onRefresh() {
    this.refresh.emit();
  }
}
