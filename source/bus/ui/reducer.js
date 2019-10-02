// Core
import { Map } from 'immutable';

// Types
import { types } from './types'

const initialState = Map({
    isFetching: false,
    valueSearch: '',
    allCompleted: false,
    editTask: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.ALL_COMPLETED_TASKS:
            return state.set('allCompleted', action.payload);

        case types.SEARCH_TASKS:
            return state.set('valueSearch', action.payload);

        default:
            return state;
    }
};
