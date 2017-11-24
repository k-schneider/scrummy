import { Action } from '@ngrx/store';

import { PokerRoom } from '../../models';

export const QUERY    = '[PokerRoom] query rooms';

export const ADDED    = '[PokerRoom] added';
export const MODIFIED = '[PokerRoom] modified';
export const REMOVED  = '[PokerRoom] removed';

export const CREATE   = '[PokerRoom] create';
export const UPDATE   = '[PokerRoom] update';
export const DELETE   = '[PokerRoom] delete';
export const SUCCESS  = '[PokerRoom] update success';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

// Initial query
export class Query implements Action {
  readonly type = QUERY;
  constructor() {}
}

// AngularFire2 StateChanges
export class Added implements Action {
  readonly type = ADDED;

  constructor(public payload: PokerRoom) { }
}

export class Modified implements Action {
  readonly type = MODIFIED;

  constructor(public payload: PokerRoom) { }
}

export class Removed implements Action {
  readonly type = REMOVED;

  constructor(public payload: PokerRoom) { }
}

// Run a Firestore Create
export class Create implements Action {
  readonly type = CREATE;
  constructor(
    public payload: PokerRoom,
  ) { }
}

// Run a Firestore Update
export class Update implements Action {
  readonly type = UPDATE;
  constructor(
    public id: string,
    public changes: Partial<PokerRoom>,
  ) { }
}

// Run a Firestore Delete
export class Delete implements Action {
  readonly type = DELETE;
  constructor(
    public id: string
  ) { }
}

export class Success implements Action {
  readonly type = SUCCESS;
  constructor() {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All =
  Query |
  Added |
  Modified |
  Removed |
  Create |
  Update |
  Success;
