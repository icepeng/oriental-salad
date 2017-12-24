import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as StatAction from '../actions/stat';
import * as UserAction from '../actions/user';
import * as fromFind from '../reducers';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindComponent implements OnInit {
  list$ = this.store.select(fromFind.getUsers);
  stat$ = this.store.select(fromFind.getStat);

  constructor(
    private router: Router,
    private store: Store<fromFind.FindState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(new UserAction.Load());
    this.store.dispatch(new StatAction.Load());
  }

  onSelect(id: string) {
    return this.router.navigate(['/', 'view', id, 'summary']);
  }
}
