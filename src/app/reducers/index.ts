import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'environments/environment';

import * as fromStat from '../core/reducers/stat';

export interface State {
  stat: fromStat.State;
}

export const reducers: ActionReducerMap<State> = {
  stat: fromStat.reducer,
};

export function logger(reducer: ActionReducer<State>) {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const getStatState = createFeatureSelector<fromStat.State>('stat');

export const getStatList = createSelector(getStatState, fromStat.getStatList);
