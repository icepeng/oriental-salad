import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store/src/selector';

import { Card } from '../../core/models/card';
import * as fromRoot from '../../reducers';
import { ViewFilter } from '../models/filter';
import { JudgeList } from '../models/judge';
import * as fromFilter from './filter';
import * as fromJudge from './judge';
import * as fromUser from './user';

export interface ViewState {
  filter: fromFilter.State;
  judge: fromJudge.State;
  user: fromUser.State;
}

export interface State extends fromRoot.State {
  view: ViewState;
}

export const reducers = {
  filter: fromFilter.reducer,
  judge: fromJudge.reducer,
  user: fromUser.reducer,
};

export const selectViewState = createFeatureSelector<ViewState>('view');

export const SelectViewJudgeState = createSelector(
  selectViewState,
  (state: ViewState) => state.judge,
);

export const getJudgeList = createSelector(
  SelectViewJudgeState,
  fromJudge.getJudgeList,
);

export const getCards = createSelector(
  SelectViewJudgeState,
  fromJudge.getCards,
);

export const SelectViewFilterState = createSelector(
  selectViewState,
  (state: ViewState) => state.filter,
);

export const getFilter = createSelector(
  SelectViewFilterState,
  fromFilter.getFilter,
);

export const getList = createSelector(
  getJudgeList,
  getFilter,
  getCards,
  (judgeList$, filter$, cards$) => {
    return cards$
      .filter(cards => filterCard(cards, filter$))
      .sort(sortCard(filter$, judgeList$));
  },
);

export const getViewLimit = createSelector(
  SelectViewFilterState,
  fromFilter.getViewLimit,
);

export const SelectViewUserState = createSelector(
  selectViewState,
  (state: ViewState) => state.user,
);

export const getUser = createSelector(SelectViewUserState, fromUser.getUser);

export const getId = createSelector(SelectViewUserState, fromUser.getId);

function filterCard(card: Card, filter: ViewFilter) {
  if (card.class !== filter.class && filter.class !== 'ALL') {
    return false;
  }
  if (card.rarity !== filter.rarity && filter.rarity !== 'ALL') {
    return false;
  }
  if (filter.cost !== 'ALL' && card.cost !== +filter.cost) {
    return false;
  }
  return true;
}

const sortCard = (filter: ViewFilter, judgeList: JudgeList) => (
  a: Card,
  b: Card,
) => {
  const sign = filter.sortOrder === 'ASC' ? 1 : -1;
  const primary = filter.sortColumn;
  const secondary = filter.sortColumn === 'value' ? 'potential' : 'value';
  if (judgeList[a.code][primary] < judgeList[b.code][primary]) {
    return -1 * sign;
  }
  if (judgeList[a.code][primary] > judgeList[b.code][primary]) {
    return 1 * sign;
  }
  if (judgeList[a.code][secondary] < judgeList[b.code][secondary]) {
    return -1 * sign;
  }
  if (judgeList[a.code][secondary] > judgeList[b.code][secondary]) {
    return 1 * sign;
  }
  return 0;
};
