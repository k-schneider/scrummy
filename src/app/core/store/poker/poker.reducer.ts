import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PokerRoom } from '../../models';
import * as pokerActions from './poker.actions';

export interface State {
  room: PokerRoom;
  creating?: boolean;
  joining?: boolean;
  voting?: boolean;
  error?: any;
  connectionRef?: any;
}

export const initialState: State = {
  room: null
};

export function reducer(state = initialState, action: pokerActions.PokerActions): State {
  switch (action.type) {

    case pokerActions.ROOM_MODIFIED: {
      return Object.assign({}, state, { room: action.pokerRoom });
    }

    case pokerActions.CREATE_ROOM: {
      return Object.assign({}, state, { creating: true });
    }

    case pokerActions.CREATE_ROOM_SUCCESS: {
      return Object.assign({}, state, { creating: false });
    }

    case pokerActions.CREATE_ROOM_FAIL: {
      return Object.assign({}, state, { error: action.error, creating: false });
    }

    case pokerActions.JOIN_ROOM: {
      return Object.assign({}, state, { joining: true });
    }

    case pokerActions.JOIN_ROOM_SUCCESS: {
      return Object.assign({}, state, { room: action.pokerRoom });
    }

    case pokerActions.JOIN_ROOM_FAIL: {
      return Object.assign({}, state, { error: action.error, joining: false });
    }

    case pokerActions.ROOM_CONNECTED: {
      return Object.assign({}, state, { ...action.payload, joining: false });
    }

    case pokerActions.LEAVE_ROOM_SUCCESS: {
      return Object.assign({}, state, { room: null });
    }

    case pokerActions.VOTE: {
      return Object.assign({}, state, { voting: true });
    }

    case pokerActions.VOTE_SUCCESS: {
      return Object.assign({}, state, { voting: false });
    }

    case pokerActions.VOTE_FAIL: {
      return Object.assign({}, state, { error: action.error, voting: false });
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

export const getPokerState = createFeatureSelector<State>('poker');

export const getConnectionRef = createSelector(getPokerState, state => {
  return state.connectionRef;
});

export const getPokerRoom = createSelector(getPokerState, state => {
  return state.room;
});
