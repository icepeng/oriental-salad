import { Action } from '@ngrx/store';
import { UserStat } from '../models/stat';

export enum UserStatActionTypes {
  Load = '[UserStat] Load',
  LoadComplete = '[UserStat] Load Complete',
  LoadError = '[UserStat] Load Error',
}

export class Load implements Action {
  readonly type = UserStatActionTypes.Load;
}

export class LoadComplete implements Action {
  readonly type = UserStatActionTypes.LoadComplete;

  constructor(public payload: { stat: UserStat }) {}
}

export class LoadError implements Action {
  readonly type = UserStatActionTypes.LoadError;

  constructor(public payload: any) {}
}

export type UserStatActions = Load | LoadComplete | LoadError;
