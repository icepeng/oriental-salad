import { User } from '../models/user';
import { UserActions, UserActionTypes } from './../actions/user';

export interface State {
  user: User;
  id: string;
}

export const initialState: State = {
  user: null,
  id: null,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadComplete: {
      return {
        user: {
          name: action.payload.userDetail.name,
          rank: action.payload.userDetail.rank,
          score: action.payload.userDetail.score,
        },
        id: action.payload.id,
      };
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;

export const getId = (state: State) => state.id;
