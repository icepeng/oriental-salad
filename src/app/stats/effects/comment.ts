import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  CommentActionTypes,
  Load,
  LoadComplete,
  LoadError,
} from '../actions/comment';
import { CommentService } from '../services/comment.service';

@Injectable()
export class CommentEffects {
  @Effect()
  load$ = this.actions$
    .ofType<Load>(CommentActionTypes.Load)
    .pipe(
      map(action => action.payload),
      switchMap(query =>
        this.commentService
          .getComments(query.cardCode)
          .pipe(
            map(comments => new LoadComplete({ comments })),
            catchError(error => of(new LoadError(error))),
          ),
      ),
    );

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
    private router: Router,
  ) {}
}
