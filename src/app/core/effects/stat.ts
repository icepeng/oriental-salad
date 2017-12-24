import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { LoadComplete, LoadError, StatActionTypes } from '../actions/stat';
import { StatService } from '../services/stat.service';

@Injectable()
export class StatEffects {
  @Effect()
  load$ = this.actions$
    .ofType(StatActionTypes.Load)
    .pipe(
      exhaustMap(() =>
        this.statService
          .getStats()
          .pipe(
            map(statList => new LoadComplete({ statList })),
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
