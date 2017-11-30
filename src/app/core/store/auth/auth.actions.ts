import { Action } from '@ngrx/store';

import { User } from '../../models';

/**
 * For each action type in an action group, make
 * constants for all of this group's action types.
 */

export const GET_USER                   = '[Auth] Get user';
export const AUTHENTICATED              = '[Auth] Authenticated';

export const GOOGLE_LOGIN               = '[Auth] Google login attempt';
export const LOGOUT                     = '[Auth] Logout';

export const AUTH_ERROR                 = '[Auth] Error';

export const SET_DISPLAY_NAME           = '[Auth] Set Display Name';
export const SET_DISPLAY_NAME_SUCCESS   = '[Auth] Set Display Name Success';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


 // -- Get User AuthState

export class GetUser implements Action {
  readonly type = GET_USER;
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public user: User) { }
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public error?: string) { }
}

// -- Google Login
export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload?: any) { }
}

// -- Set Display Name

export class SetDisplayName implements Action {
  readonly type = SET_DISPLAY_NAME;
  constructor(public displayName: string) { }
}

export class SetDisplayNameSuccess implements Action {
  readonly type = SET_DISPLAY_NAME_SUCCESS;
  constructor(public displayName: string) { }
}

export type AuthActions
            = GetUser
            | Authenticated
            | GoogleLogin
            | AuthError
            | SetDisplayName
            | SetDisplayNameSuccess;
