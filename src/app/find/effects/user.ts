import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { LoadComplete, LoadError, UserActionTypes } from '../actions/user';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  @Effect()
  search$ = this.actions$
    .ofType(UserActionTypes.Load)
    .pipe(
      exhaustMap(() =>
        this.searchService
          .getAll()
          .pipe(
            map(users => new LoadComplete({ users })),
            catchError(error => of(new LoadError(error))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private searchService: UserService,
    private router: Router,
  ) {}
}
