import { Action } from '@ngrx/store';

import { UserDetail } from '../models/user';

export enum UserActionTypes {
  Load = '[User Detail] Load',
  LoadComplete = '[User Detail] Load Complete',
  LoadError = '[User Detail] Load Error',
}

export class Load implements Action {
  readonly type = UserActionTypes.Load;

  constructor(public payload: { id: string }) {}
}

export class LoadComplete implements Action {
  readonly type = UserActionTypes.LoadComplete;

  constructor(public payload: { userDetail: UserDetail, id: string }) {}
}

export class LoadError implements Action {
  readonly type = UserActionTypes.LoadError;

  constructor(public payload: any) {}
}

export type UserActions = Load | LoadComplete | LoadError;
