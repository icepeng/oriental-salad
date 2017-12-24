import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Comparator, Filter, SortOrder } from '@clr/angular';
import { Subject } from 'rxjs/Subject';

import { User } from '../models/user';

class ScoreComparator implements Comparator<User> {
  compare(a: User, b: User) {
    return +a.score - +b.score;
  }
}

class RankComparator implements Comparator<User> {
  compare(a: User, b: User) {
    return a.rank - b.rank;
  }
}

class CountComparator implements Comparator<User> {
  compare(a: User, b: User) {
    return a.judgeCount - b.judgeCount;
  }
}

class RankFilter implements Filter<User> {
  checked = true;
  changes = new Subject<any>();

  constructor() {
    this.changes.next(true);
  }

  toggle() {
    this.checked = !this.checked;
    this.changes.next(true);
  }

  isActive(): boolean {
    return true;
  }

  accepts(searchResult: User) {
    return this.checked ? !!searchResult.rank : true;
  }
}

@Component({
  selector: 'app-user-datagrid',
  templateUrl: './user-datagrid.component.html',
  styleUrls: ['./user-datagrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDatagridComponent implements OnInit {
  @Input() list: User[];
  @Output('select') select = new EventEmitter<string>();
  rankOrder = SortOrder.Asc;
  scoreComparator = new ScoreComparator();
  rankComparator = new RankComparator();
  countComparator = new CountComparator();
  rankFilter = new RankFilter();

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick(item: User) {
    this.select.emit(item.id);
  }
}
