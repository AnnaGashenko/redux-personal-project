// Core
import { put, apply } from 'redux-saga/effects'

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { taskActions } from '../../../tasks/actions';

export function* completedAllTask ( {payload }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.update, [payload]);
        const { message } = yield apply(response, response.json);

        if(response.status !== 200) {
            throw new Error(message);
        }

        yield put(taskActions.completedAllTask());
    } catch (error) {
        yield put(uiActions.emitError(error, '-> updateCompleted worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
