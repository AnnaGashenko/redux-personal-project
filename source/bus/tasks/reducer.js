// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return state.merge(fromJS(action.payload));

        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.REMOVE_TASK:
            return state.filter(task => task.get('id') !== action.payload);

        case types.UPDATE_TASK:
            return state.update(state.findIndex((task) => action.payload.id === task.get('id')), () => fromJS(action.payload));

        case types.COMPLETED_ALL_TASK:
            return state.map((task) => task.set('completed', true));

        default:
            return state;
    }
};
