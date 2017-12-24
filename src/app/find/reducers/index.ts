import { UserStat } from '../models/stat';
import { User } from '../models/user';
import * as fromStat from './stat';
import * as fromUser from './user';
import * as fromRoot from '../../reducers';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store/src/selector';

export interface FindState {
  user: fromUser.State;
  stat: fromStat.State;
}

export interface State extends fromRoot.State {
  judgeFind: FindState;
}

export const reducers = {
  user: fromUser.reducer,
  stat: fromStat.reducer,
};

export const selectFindState = createFeatureSelector<FindState>(
  'find',
);

export const selectFindUserState = createSelector(
  selectFindState,
  (state: FindState) => state.user,
);

export const getUsers = createSelector(
  selectFindUserState,
  fromUser.getUsers,
);

export const selectFindStatState = createSelector(
  selectFindState,
  (state: FindState) => state.stat,
);

export const getStat = createSelector(
  selectFindStatState,
  fromStat.getStat,
);
