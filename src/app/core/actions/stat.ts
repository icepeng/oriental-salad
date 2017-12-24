import { Action } from '@ngrx/store';
import { StatList } from '../models/stat';

export enum StatActionTypes {
  Load = '[Stat] Load',
  LoadComplete = '[Stat] Load Complete',
  LoadError = '[Stat] Load Error',
}

export class Load implements Action {
  readonly type = StatActionTypes.Load;
}

export class LoadComplete implements Action {
  readonly type = StatActionTypes.LoadComplete;

  constructor(public payload: { statList: StatList }) {}
}

export class LoadError implements Action {
  readonly type = StatActionTypes.LoadError;

  constructor(public payload: any) {}
}

export type StatActions = Load | LoadComplete | LoadError;
