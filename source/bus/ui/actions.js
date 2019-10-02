// Types
import { types } from './types';

export const uiActions = {
    startFetching: () => {
        return {
            type: types.START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: types.STOP_FETCHING,
        }
    },

    searchTask : ( value ) =>  {
        return {
            type: types.SEARCH_TASKS,
            payload: value,
        };
    },

    allCompletedTask : ( value ) =>  {
        return {
            type: types.ALL_COMPLETED_TASKS,
            payload: value,
        };
    },

    emitError: (error, meta = null) => {
        return {
            type: types.EMIT_ERROR,
            payload: error,
            error: true,
            meta,
        }
    },
};
