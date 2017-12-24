import { Action } from '@ngrx/store';

import { ViewFilter } from '../models/filter';

export enum FilterActionTypes {
  Set = '[View Filter] Set',
  Reset = '[View Filter] Reset',
  ExpandLimit = '[View Filter] Expand Limit',
}

export class SetFilter implements Action {
  readonly type = FilterActionTypes.Set;

  constructor(public payload: { filter: ViewFilter }) {}
}

export class ResetFilter implements Action {
  readonly type = FilterActionTypes.Reset;
}

export class ExpandLimit implements Action {
  readonly type = FilterActionTypes.ExpandLimit;
}

export type FilterActions = SetFilter | ResetFilter | ExpandLimit;
