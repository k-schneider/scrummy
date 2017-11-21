import * as actions from './counter.actions';

export interface State {
  value: number;
}

export const initialState: State = {
  value: 23,
};

export function reducer(state = initialState, action: actions.All): State {
  switch (action.type) {

    case actions.DECREMENT: {
      return { value: state.value - 1 };
    }

    case actions.INCREMENT: {
      return { value: state.value + 1 };
    }

    case actions.OVERRIDE: {
      return { value: action.payload };
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

 export const getValue = (state: State) => state.value;
