import { Action } from '@ngrx/store';

import { PokerRoom } from '../../models';

/**
 * For each action type in an action group, make
 * constants for all of this group's action types.
 */
export const CREATE_ROOM          = '[Poker] Create Room';
export const CREATE_ROOM_SUCCESS  = '[Poker] Create Room Success';
export const CREATE_ROOM_FAIL     = '[Poker] Create Room Fail';

export const JOIN_ROOM            = '[Poker] Join Room';
export const JOIN_ROOM_SUCCESS    = '[Poker] Join Room Success';
export const JOIN_ROOM_FAIL       = '[Poker] Join Room Fail';

export const VOTE                 = '[Poker] Vote';
export const VOTE_SUCCESS         = '[Poker] Vote Success';
export const VOTE_FAIL            = '[Poker] Vote Fail';

export const LEAVE_ROOM           = '[Poker] Leave Room';
export const LEAVE_ROOM_SUCCESS   = '[Poker] Leave Room Success';

export const ROOM_CONNECTED       = '[Poker] Room Connected';
export const ROOM_MODIFIED        = '[Poker] Room Modified';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */


// -- Create a room in the database

export class CreateRoom implements Action {
  readonly type = CREATE_ROOM;
  constructor(public pokerRoom: PokerRoom) { }
}

export class CreateRoomSuccess implements Action {
  readonly type = CREATE_ROOM_SUCCESS;
  constructor(public pokerRoomId: string) { }
}

export class CreateRoomFail implements Action {
  readonly type = CREATE_ROOM_FAIL;
  constructor(public error?: any) { }
}

// -- Join an existing room

export class JoinRoom implements Action {
  readonly type = JOIN_ROOM;
  constructor(public pokerRoomId: string) { }
}

export class JoinRoomSuccess implements Action {
  readonly type = JOIN_ROOM_SUCCESS;
  constructor(public pokerRoom: PokerRoom) { }
}

export class JoinRoomFail implements Action {
  readonly type = JOIN_ROOM_FAIL;
  constructor(public error?: any) { }
}

// -- Presence connected to room

export class RoomConnected implements Action {
  readonly type = ROOM_CONNECTED;
  constructor(public payload: any) { }
}

// -- AngularFire2 room state changes

export class RoomModified implements Action {
  readonly type = ROOM_MODIFIED;
  constructor(public pokerRoom: PokerRoom) {}
}

// -- Leave a room

export class LeaveRoom implements Action {
  readonly type = LEAVE_ROOM;
}

export class LeaveRoomSuccess implements Action {
  readonly type = LEAVE_ROOM_SUCCESS;
}

// -- Cast your vote

export class Vote implements Action {
  readonly type = VOTE;
  constructor(public vote: number | string) { }
}

export class VoteSuccess implements Action {
  readonly type = VOTE_SUCCESS;
}

export class VoteFail implements Action {
  readonly type = VOTE_FAIL;
  constructor(public error?: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type PokerActions
            = CreateRoom
            | CreateRoomSuccess
            | CreateRoomFail
            | JoinRoom
            | JoinRoomSuccess
            | JoinRoomFail
            | RoomConnected
            | RoomModified
            | LeaveRoom
            | LeaveRoomSuccess
            | Vote
            | VoteSuccess
            | VoteFail;
