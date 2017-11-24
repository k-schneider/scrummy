import * as actions from './poker-room.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { PokerRoom } from '../../models';

export const pokerRoomAdapter = createEntityAdapter<PokerRoom>();
// tslint:disable-next-line:no-empty-interface
export interface State extends EntityState<PokerRoom> { }

export const initialState: State = pokerRoomAdapter.getInitialState();

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {

    case actions.ADDED:
      return pokerRoomAdapter.addOne(action.payload, state);

    case actions.MODIFIED:
      return pokerRoomAdapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);

    case actions.REMOVED:
    return pokerRoomAdapter.removeOne(action.payload.id, state);

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

export const getPokerRoomState = createFeatureSelector<State>('pokerRoom');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = pokerRoomAdapter.getSelectors(getPokerRoomState);
