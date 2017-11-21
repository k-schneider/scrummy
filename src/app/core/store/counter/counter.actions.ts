import { Action } from '@ngrx/store';

export const DECREMENT =  '[Counter] Decrement';
export const INCREMENT =  '[Counter] Increment';
export const OVERRIDE =   '[Counter] Override';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class DecrementAction implements Action {
  readonly type = DECREMENT;

  constructor() { }
}

export class IncrementAction implements Action {
  readonly type = INCREMENT;

  constructor() { }
}

export class OverrideAction implements Action {
  readonly type = OVERRIDE;

  constructor(public payload: number) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type All
= DecrementAction
| IncrementAction
| OverrideAction;
