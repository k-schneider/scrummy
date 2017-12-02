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

export const ROOM_CONNECTED       = '[Poker] Room Connected';
export const ROOM_MODIFIED        = '[Poker] Room Modified';

export const VOTE                 = '[Poker] Vote';
export const VOTE_SUCCESS         = '[Poker] Vote Success';
export const VOTE_FAIL            = '[Poker] Vote Fail';

export const CLEAR_VOTES          = '[Poker] Clear Votes';
export const CLEAR_VOTES_SUCCESS  = '[Poker] Clear Votes Success';
export const CLEAR_VOTES_FAIL     = '[Poker] Clear Votes Fail';

export const FLIP_CARDS           = '[Poker] Flip Cards';
export const FLIP_CARDS_SUCCESS   = '[Poker] Flip Cards Success';
export const FLIP_CARDS_FAIL      = '[Poker] Flip Cards Fail';

export const RESET_ROOM           = '[Poker] Reset Room';
export const RESET_ROOM_SUCCESS   = '[Poker] Reset Room Success';
export const RESET_ROOM_FAIL      = '[Poker] Reset Room Fail';

export const LEAVE_ROOM           = '[Poker] Leave Room';
export const LEAVE_ROOM_SUCCESS   = '[Poker] Leave Room Success';

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

// -- Clear votes

export class ClearVotes implements Action {
  readonly type = CLEAR_VOTES;
}

export class ClearVotesSuccess implements Action {
  readonly type = CLEAR_VOTES_SUCCESS;
}

export class ClearVotesFail implements Action {
  readonly type = CLEAR_VOTES_FAIL;
  constructor(public error?: any) { }
}

// Flip cards

export class FlipCards implements Action {
  readonly type = FLIP_CARDS;
}

export class FlipCardsSuccess implements Action {
  readonly type = FLIP_CARDS_SUCCESS;
}

export class FlipCardsFail implements Action {
  readonly type = FLIP_CARDS_FAIL;
  constructor(public error?: any) { }
}

// Reset room

export class ResetRoom implements Action {
  readonly type = RESET_ROOM;
}

export class ResetRoomSuccess implements Action {
  readonly type = RESET_ROOM_SUCCESS;
}

export class ResetRoomFail implements Action {
  readonly type = RESET_ROOM_FAIL;
  constructor(public error?: any) { }
}

// -- Leave a room

export class LeaveRoom implements Action {
  readonly type = LEAVE_ROOM;
}

export class LeaveRoomSuccess implements Action {
  readonly type = LEAVE_ROOM_SUCCESS;
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
            | Vote
            | VoteSuccess
            | VoteFail
            | ClearVotes
            | ClearVotesSuccess
            | ClearVotesFail
            | FlipCards
            | FlipCardsSuccess
            | FlipCardsFail
            | ResetRoom
            | ResetRoomSuccess
            | ResetRoomFail
            | LeaveRoom
            | LeaveRoomSuccess;
