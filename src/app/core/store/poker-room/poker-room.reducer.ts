import { createFeatureSelector } from '@ngrx/store';

import { PokerRoom } from '../../models';
import * as pokerRoomActions from './poker-room.actions';

// tslint:disable-next-line:no-empty-interface
export interface State {
  error?: any;
  loading: boolean;
  playerId: string;
  pokerRoom: PokerRoom;
}

export const initialState: State = {
  loading: false,
  playerId: null,
  pokerRoom: null
};

export function reducer(state = initialState, action: pokerRoomActions.PokerRoomActions): State {
  switch (action.type) {

    case pokerRoomActions.MODIFIED: {
      return Object.assign({}, state, { pokerRoom: action.payload });
    }

    case pokerRoomActions.JOIN: {
      return Object.assign({}, state, { loading: true });
    }

    case pokerRoomActions.JOIN_SUCCESS: {
      return Object.assign({}, state, { pokerRoom: action.payload, loading: false });
    }

    case pokerRoomActions.JOIN_FAIL: {
      return Object.assign({}, state, { error: action.payload, loading: false });
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getPokerRoomState = createFeatureSelector<State>('pokerRoom');
