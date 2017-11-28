import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PokerRoom } from '../../models';
import * as pokerRoomActions from './poker-room.actions';

// tslint:disable-next-line:no-empty-interface
export interface State {
  error?: any;
  connectionRef?: any;
  creating: boolean;
  joining: boolean;
  pokerRoom: PokerRoom;
}

export const initialState: State = {
  creating: false,
  joining: false,
  pokerRoom: null
};

export function reducer(state = initialState, action: pokerRoomActions.PokerRoomActions): State {
  switch (action.type) {

    case pokerRoomActions.MODIFIED: {
      return Object.assign({}, state, { pokerRoom: action.payload });
    }

    case pokerRoomActions.CREATE: {
      return Object.assign({}, state, { creating: true });
    }

    case pokerRoomActions.CREATE_SUCCESS: {
      return Object.assign({}, state, { creating: false });
    }

    case pokerRoomActions.CREATE_FAIL: {
      return Object.assign({}, state, { error: action.payload, creating: false });
    }

    case pokerRoomActions.JOIN: {
      return Object.assign({}, state, { joining: true });
    }

    case pokerRoomActions.JOIN_SUCCESS: {
      return Object.assign({}, state, { pokerRoom: action.payload });
    }

    case pokerRoomActions.JOIN_FAIL: {
      return Object.assign({}, state, { error: action.payload, joining: false });
    }

    case pokerRoomActions.ROOM_CONNECTED: {
      return Object.assign({}, state, { ...action.payload, joining: false });
    }

    case pokerRoomActions.LEAVE_SUCCESS: {
      return Object.assign({}, state, { pokerRoom: null });
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

export const getConnectionRef = createSelector(getPokerRoomState, state => {
  return state.connectionRef;
});

export const getPokerRoom = createSelector(getPokerRoomState, state => {
  return state.pokerRoom;
});
