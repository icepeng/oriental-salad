import { User } from '../models/user';
import { UserActions, UserActionTypes } from './../actions/user';

export interface State {
  users: User[];
}

export const initialState: State = {
  users: [],
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadComplete: {
      return {
        users: action.payload.users,
      };
    }

    default: {
      return state;
    }
  }
}

export const getUsers = (state: State) => state.users;
