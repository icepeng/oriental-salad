import { StatList } from '../models/stat';
import { StatActions, StatActionTypes } from './../actions/stat';

export interface State {
  statList: StatList;
}

export const initialState: State = {
  statList: null,
};

export function reducer(state = initialState, action: StatActions): State {
  switch (action.type) {
    case StatActionTypes.LoadComplete: {
      return {
        statList: action.payload.statList,
      };
    }

    default: {
      return state;
    }
  }
}

export const getStatList = (state: State) => state.statList;
