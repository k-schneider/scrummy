import { RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import { environment } from '../../../environments/environment';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromCounter from './counter';
import * as fromPoker from './poker';
import * as fromRouter from './router';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  counter: fromCounter.State;
  poker: fromPoker.State;
  router: RouterReducerState<fromRouter.State>;
}

/**
 * Build final reducer map and define any meta reducers
 * based on targetted environment.
 */
export const reducers: ActionReducerMap<State>  = {
  counter: fromCounter.reducer,
  poker: fromPoker.reducer,
  router: fromRouter.reducer
};

const metaReducersDev = [];

const metaReducersProd = [];

export const metaReducers = environment.production
  ? metaReducersProd
  : metaReducersDev;

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors
 * that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */

/**
 * Counter Selectors
 */
export const getCounterState = (state: State) => state.counter;
export const getCounterValue = createSelector(getCounterState, fromCounter.getValue);

/**
 * Poker Room Selectors
 */
