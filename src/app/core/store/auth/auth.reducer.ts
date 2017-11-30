import { createFeatureSelector, createSelector } from '@ngrx/store';

import { User } from '../../models';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  loading?: boolean;
  saving?: boolean;
  error?: string;
}

export const initialState: State = {
  user: null
};

export function reducer(state = initialState, action: authActions.AuthActions): State {
  switch (action.type) {

    case authActions.GET_USER: {
      return Object.assign({}, state, { loading: true });
    }

    case authActions.AUTHENTICATED: {
      return Object.assign({}, state, { user: action.user, loading: false });
    }

    case authActions.GOOGLE_LOGIN: {
      return Object.assign({}, state, { loading: true });
    }

    case authActions.AUTH_ERROR: {
      return Object.assign({}, state, { error: action.error, loading: false, saving: false });
    }

    case authActions.SET_DISPLAY_NAME: {
      return Object.assign({}, state, { saving: true });
    }

    case authActions.SET_DISPLAY_NAME_SUCCESS: {
      const user = Object.assign({}, state.user, { displayName: action.displayName });
      return Object.assign({}, state, { user: user, saving: false });
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

export const getAuthState = createFeatureSelector<State>('auth');
export const getUser = createSelector(getAuthState, state => state.user);
export const getLoading = createSelector(getAuthState, state => state.loading);
export const getSaving = createSelector(getAuthState, state => state.saving);
export const getError = createSelector(getAuthState, state => state.error);
