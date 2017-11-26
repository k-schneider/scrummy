import { Action } from '@ngrx/store';

import { PokerRoom } from '../../models';

/**
 * For each action type in an action group, make
 * constants for all of this group's action types.
 */
export const ADDED            = '[PokerRoom] Added';
export const MODIFIED         = '[PokerRoom] Modified';
export const REMOVED          = '[PokerRoom] Removed';

export const CREATE           = '[PokerRoom] Create';
export const CREATE_SUCCESS   = '[PokerRoom] Create Success';
export const CREATE_FAIL      = '[PokerRoom] Create Fail';

export const JOIN             = '[PokerRoom] Join';
export const JOIN_SUCCESS     = '[PokerRoom] Join Success';
export const JOIN_FAIL        = '[PokerRoom] Join Fail';

export const VOTE             = '[PokerRoom] Vote';
export const VOTE_SUCCESS     = '[PokerRoom] Vote Success';
export const VOTE_FAIL        = '[PokerRoom] Vote Fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class Added implements Action {
  readonly type = ADDED;
  constructor(public payload: PokerRoom) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public payload: PokerRoom) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor(public payload: PokerRoom) {}
}

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: PokerRoom) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;
  constructor(public payload?: any) { }
}

export class Join implements Action {
  readonly type = JOIN;
  constructor(public payload: string) { }
}

export class JoinSuccess implements Action {
  readonly type = JOIN_SUCCESS;
  constructor(public payload: PokerRoom) { }
}

export class JoinFail implements Action {
  readonly type = JOIN_FAIL;
  constructor(public payload?: any) { }
}

export class Vote implements Action {
  readonly type = VOTE;
  constructor(public payload: number | string) { }
}

export class VoteSuccess implements Action {
  readonly type = VOTE_SUCCESS;
}

export class VoteFail implements Action {
  readonly type = VOTE_FAIL;
  constructor(public payload?: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PokerRoomActions
            = Added
            | Modified
            | Removed
            | Create
            | CreateSuccess
            | CreateFail
            | Join
            | JoinSuccess
            | JoinFail
            | Vote
            | VoteSuccess
            | VoteFail;
