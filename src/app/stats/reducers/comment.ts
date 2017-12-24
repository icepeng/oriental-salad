import { appConfig } from 'app/config';

import { Card } from '../../core/models/card';
import { Comments } from '../models/comment';
import { StatFilter } from '../models/filter';
import { CommentActions, CommentActionTypes } from './../actions/comment';

export interface State {
  comments: Comments;
}

export const initialState: State = {
  comments: null,
};

export function reducer(state = initialState, action: CommentActions): State {
  switch (action.type) {
    case CommentActionTypes.LoadComplete: {
      return {
        comments: action.payload.comments,
      };
    }

    default: {
      return state;
    }
  }
}

export const getComments = (state: State) => state.comments;
