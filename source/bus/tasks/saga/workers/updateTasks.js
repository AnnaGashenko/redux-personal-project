// Core
import { put, apply } from 'redux-saga/effects'

// Instruments
import { api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { taskActions } from '../../../tasks/actions';

export function* updateTasks ( {payload }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.update, [payload]);
        const { data: [tasks], message } = yield apply(response, response.json);

        if(response.status !== 200) {
            throw new Error(message);
        }

        yield put(taskActions.updateTask(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> updateCompleted worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
