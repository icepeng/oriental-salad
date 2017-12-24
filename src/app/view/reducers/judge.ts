import { appConfig } from '../../config';
import { Card } from '../../core/models/card';
import { JudgeList } from '../models/judge';
import { UserActions, UserActionTypes } from './../actions/user';

export interface State {
  judgeList: JudgeList;
  cards: Card[];
}

export const initialState: State = {
  judgeList: {},
  cards: [],
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadComplete: {
      return {
        judgeList: action.payload.userDetail.judges.reduce(
          (obj, stat) => ({
            ...obj,
            [stat.cardCode]: stat,
          }),
          {} as JudgeList,
        ),
        cards: appConfig.cardData.filter(card =>
          action.payload.userDetail.judges.find(
            x => x.cardCode === card.code,
          ),
        ),
      };
    }

    default: {
      return state;
    }
  }
}

export const getJudgeList = (state: State) => state.judgeList;

export const getCards = (state: State) => state.cards;
