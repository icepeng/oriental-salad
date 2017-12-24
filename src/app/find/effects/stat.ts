import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import { StatService } from '../services/stat.service';
import {
  Load,
  LoadComplete,
  LoadError,
  UserStatActionTypes,
} from '../actions/stat';
import { UserStat } from '../models/stat';

@Injectable()
export class UserStatEffects {
  @Effect()
  load$ = this.actions$
    .ofType(UserStatActionTypes.Load)
    .pipe(
      exhaustMap(() =>
        this.statService
          .getStats()
          .pipe(
            map(stat => new LoadComplete({ stat })),
            catchError(error => of(new LoadError(error))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private statService: StatService,
    private router: Router,
  ) {}
}
