import { Action } from '@ngrx/store';
import * as firebase from 'firebase';

import { PokerRoom } from '../../models';

/**
 * For each action type in an action group, make
 * constants for all of this group's action types.
 */
export const MODIFIED         = '[PokerRoom] Modified';

export const CREATE           = '[PokerRoom] Create';
export const CREATE_SUCCESS   = '[PokerRoom] Create Success';
export const CREATE_FAIL      = '[PokerRoom] Create Fail';

export const JOIN             = '[PokerRoom] Join';
export const JOIN_SUCCESS     = '[PokerRoom] Join Success';
export const JOIN_FAIL        = '[PokerRoom] Join Fail';

export const VOTE             = '[PokerRoom] Vote';
export const VOTE_SUCCESS     = '[PokerRoom] Vote Success';
export const VOTE_FAIL        = '[PokerRoom] Vote Fail';

export const LEAVE            = '[PokerRoom] Leave';
export const LEAVE_SUCCESS    = '[PokerRoom] Leave Success';

export const ROOM_CONNECTED   = '[PokerRoom] Room Connected';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


// -- AngularFire2 StateChanges

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor(public payload: PokerRoom) {}
}

// Create a room in the database

export class Create implements Action {
  readonly type = CREATE;
  constructor(public payload: PokerRoom) { }
}

export class CreateSuccess implements Action {
  readonly type = CREATE_SUCCESS;
  constructor(public payload: string) { }
}

export class CreateFail implements Action {
  readonly type = CREATE_FAIL;
  constructor(public payload?: any) { }
}

// Join an existing room --

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

// Cast your vote --

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

// -- Presence connected to room

export class RoomConnected implements Action {
  readonly type = ROOM_CONNECTED;
  constructor(public payload: any) { }
}

// -- Leave a room

export class Leave implements Action {
  readonly type = LEAVE;
}

export class LeaveSuccess implements Action {
  readonly type = LEAVE_SUCCESS;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PokerRoomActions
            = Modified
            | Create
            | CreateSuccess
            | CreateFail
            | Join
            | JoinSuccess
            | JoinFail
            | Vote
            | VoteSuccess
            | VoteFail
            | RoomConnected
            | Leave
            | LeaveSuccess;
