import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store/src/selector';

import { appConfig } from '../../config';
import { Card } from '../../core/models/card';
import { StatList } from '../../core/models/stat';
import * as fromRoot from '../../reducers';
import { StatFilter } from '../models/filter';
import * as fromComment from './comment';
import * as fromFilter from './filter';

export interface StatViewerState {
  filter: fromFilter.State;
  comment: fromComment.State;
}

export interface State extends fromRoot.State {
  statViewer: StatViewerState;
}

export const reducers = {
  filter: fromFilter.reducer,
  comment: fromComment.reducer,
};

export const selectStatViewerState = createFeatureSelector<StatViewerState>(
  'statViewer',
);

export const SelectStatViewerFilterState = createSelector(
  selectStatViewerState,
  (state: StatViewerState) => state.filter,
);

export const getFilter = createSelector(
  SelectStatViewerFilterState,
  fromFilter.getFilter,
);

export const getList = createSelector(
  fromRoot.getStatList,
  getFilter,
  (statList, filter) => {
    return appConfig.cardData
      .filter(cards => filterCard(cards, filter))
      .sort(sortCard(filter, statList));
  },
);

export const getViewLimit = createSelector(
  SelectStatViewerFilterState,
  fromFilter.getViewLimit,
);

export const SelectStatViewerCommentState = createSelector(
  selectStatViewerState,
  (state: StatViewerState) => state.comment,
);

export const getComments = createSelector(
  SelectStatViewerCommentState,
  fromComment.getComments,
);

function filterCard(card: Card, filter: StatFilter) {
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

const sortCard = (filter: StatFilter, statList: StatList) => (
  a: Card,
  b: Card,
) => {
  const sign = filter.sortOrder === 'ASC' ? 1 : -1;
  const primary = filter.sortColumn;
  const secondary = filter.sortColumn === 'value' ? 'potential' : 'value';
  if (statList[a.code][primary].mean < statList[b.code][primary].mean) {
    return -1 * sign;
  }
  if (statList[a.code][primary].mean > statList[b.code][primary].mean) {
    return 1 * sign;
  }
  if (statList[a.code][secondary].mean < statList[b.code][secondary].mean) {
    return -1 * sign;
  }
  if (statList[a.code][secondary].mean > statList[b.code][secondary].mean) {
    return 1 * sign;
  }
  return 0;
};
