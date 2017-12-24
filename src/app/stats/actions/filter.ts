import { Action } from '@ngrx/store';

import { StatFilter } from '../models/filter';

export enum FilterActionTypes {
  Set = '[Stat Filter] Set',
  Reset = '[Stat Filter] Reset',
  ExpandLimit = '[Stat Filter] Expand Limit',
}

export class SetFilter implements Action {
  readonly type = FilterActionTypes.Set;

  constructor(public payload: { filter: StatFilter }) {}
}

export class ResetFilter implements Action {
  readonly type = FilterActionTypes.Reset;
}

export class ExpandLimit implements Action {
  readonly type = FilterActionTypes.ExpandLimit;
}

export type FilterActions = SetFilter | ResetFilter | ExpandLimit;
