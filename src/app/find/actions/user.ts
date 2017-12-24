import { Action } from '@ngrx/store';
import { User } from '../models/user';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadComplete = '[User] Load Complete',
  LoadError = '[User] Load Error',
}

export class Load implements Action {
  readonly type = UserActionTypes.Load;
}

export class LoadComplete implements Action {
  readonly type = UserActionTypes.LoadComplete;

  constructor(public payload: { users: User[] }) {}
}

export class LoadError implements Action {
  readonly type = UserActionTypes.LoadError;

  constructor(public payload: any) {}
}

export type UserActions = Load | LoadComplete | LoadError;
