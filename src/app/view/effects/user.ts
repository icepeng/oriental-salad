import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  UserActionTypes,
  Load,
  LoadComplete,
  LoadError,
} from '../actions/user';
import { ViewService } from '../services/view.service';

@Injectable()
export class UserEffects {
  @Effect()
  load$ = this.actions$
    .ofType<Load>(UserActionTypes.Load)
    .pipe(
      map(action => action.payload),
      switchMap(query =>
        this.viewService
          .getUserDetail(query.id)
          .pipe(
            map(userDetail => new LoadComplete({ userDetail, id: query.id })),
            catchError(error => of(new LoadError(error))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private viewService: ViewService,
    private router: Router,
  ) {}
}
