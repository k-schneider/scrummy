import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PokerRoom } from '../../models';
import * as pokerActions from './poker.actions';

export interface State {
  room: PokerRoom;
  creating?: boolean;
  createError?: string;
  joining?: boolean;
  joinError?: string;
  voting?: boolean;
  voteError?: string;
  clearing?: boolean;
  clearError?: string;
  flipping?: boolean;
  flipError?: string;
  resetting?: boolean;
  resetError?: string;
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
      return Object.assign({}, state, { creating: true, createError: null });
    }

    case pokerActions.CREATE_ROOM_SUCCESS: {
      return Object.assign({}, state, { creating: false, createError: null });
    }

    case pokerActions.CREATE_ROOM_FAIL: {
      return Object.assign({}, state, { createError: action.error, creating: false });
    }

    case pokerActions.JOIN_ROOM: {
      return Object.assign({}, state, { joining: true, joinError: null });
    }

    case pokerActions.JOIN_ROOM_SUCCESS: {
      return Object.assign({}, state, { room: action.pokerRoom, joinError: null });
    }

    case pokerActions.JOIN_ROOM_FAIL: {
      return Object.assign({}, state, { joinError: action.error, joining: false });
    }

    case pokerActions.ROOM_CONNECTED: {
      return Object.assign({}, state, { ...action.payload, joining: false });
    }

    case pokerActions.VOTE: {
      return Object.assign({}, state, { voting: true, voteError: null });
    }

    case pokerActions.VOTE_SUCCESS: {
      return Object.assign({}, state, { voting: false, voteError: null });
    }

    case pokerActions.VOTE_FAIL: {
      return Object.assign({}, state, { voteError: action.error, voting: false });
    }

    case pokerActions.CLEAR_VOTES: {
      return Object.assign({}, state, { clearing: true, clearError: null });
    }

    case pokerActions.CLEAR_VOTES_SUCCESS: {
      return Object.assign({}, state, { clearing: false, clearError: null });
    }

    case pokerActions.CLEAR_VOTES_FAIL: {
      return Object.assign({}, state, { clearError: action.error, clearing: false });
    }

    case pokerActions.FLIP_CARDS: {
      return Object.assign({}, state, { flipping: true, flipError: null });
    }

    case pokerActions.FLIP_CARDS_SUCCESS: {
      return Object.assign({}, state, { flipping: false, flipError: null });
    }

    case pokerActions.FLIP_CARDS_FAIL: {
      return Object.assign({}, state, { flipError: action.error, flipping: false });
    }

    case pokerActions.RESET_ROOM: {
      return Object.assign({}, state, { resetting: true, resetError: null });
    }

    case pokerActions.RESET_ROOM_SUCCESS: {
      return Object.assign({}, state, { resetting: false, resetError: null });
    }

    case pokerActions.RESET_ROOM_FAIL: {
      return Object.assign({}, state, { resetError: action.error, resetting: false });
    }

    case pokerActions.LEAVE_ROOM_SUCCESS: {
      return Object.assign({}, state, { room: null });
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

export const getConnectionRef = createSelector(getPokerState, state => state.connectionRef);
export const getPokerRoom = createSelector(getPokerState, state => state.room);
export const getJoining = createSelector(getPokerState, state => state.joining);
export const getJoinError = createSelector(getPokerState, state => state.joinError);
