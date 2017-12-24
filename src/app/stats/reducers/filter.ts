import { StatFilter } from '../models/filter';
import { FilterActions, FilterActionTypes } from './../actions/filter';

export interface State {
  filter: StatFilter;
  viewLimit: number;
}

export const initialState: State = {
  filter: {
    class: 'ALL',
    cost: 'ALL',
    rarity: 'ALL',
    sortColumn: 'value',
    sortOrder: 'DESC',
  },
  viewLimit: 20,
};

export function reducer(state = initialState, action: FilterActions): State {
  switch (action.type) {
    case FilterActionTypes.Set: {
      return {
        filter: action.payload.filter,
        viewLimit: 20,
      };
    }
    case FilterActionTypes.Reset: {
      return {
        filter: { ...initialState.filter },
        viewLimit: 20,
      };
    }

    case FilterActionTypes.ExpandLimit: {
      return {
        ...state,
        viewLimit: state.viewLimit + 20,
      };
    }

    default: {
      return state;
    }
  }
}

export const getFilter = (state: State) => state.filter || initialState.filter;

export const getViewLimit = (state: State) => state.viewLimit;
