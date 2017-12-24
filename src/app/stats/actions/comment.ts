import { Action } from '@ngrx/store';

import { Comments } from '../models/comment';

export enum CommentActionTypes {
  Load = '[Comment] Load',
  LoadComplete = '[Comment] Load Complete',
  LoadError = '[Comment] Load Error',
}

export class Load implements Action {
  readonly type = CommentActionTypes.Load;

  constructor(public payload: { cardCode: string }) {}
}

export class LoadComplete implements Action {
  readonly type = CommentActionTypes.LoadComplete;

  constructor(public payload: { comments: Comments }) {}
}

export class LoadError implements Action {
  readonly type = CommentActionTypes.LoadError;

  constructor(public payload: any) {}
}

export type CommentActions = Load | LoadComplete | LoadError;
