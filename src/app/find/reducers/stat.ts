import { UserStat } from '../models/stat';
import { UserStatActions, UserStatActionTypes } from './../actions/stat';

export interface State {
  stat: UserStat;
}

export const initialState: State = {
  stat: null,
};

export function reducer(state = initialState, action: UserStatActions): State {
  switch (action.type) {
    case UserStatActionTypes.LoadComplete: {
      return {
        stat: action.payload.stat,
      };
    }

    default: {
      return state;
    }
  }
}

export const getStat = (state: State) => state.stat;
