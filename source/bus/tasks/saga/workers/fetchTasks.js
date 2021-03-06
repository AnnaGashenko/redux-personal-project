// Core
import { put, apply } from 'redux-saga/effects'

// Instruments
import { api } from '../../../../REST';
import { taskActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* fetchTasks () {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.fetch);
        const { data: tasks, message } = yield apply(response, response.json);

        if(response.status !== 200) {
            throw new Error(message);
        }

        yield put(taskActions.fillTasks(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fetch worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
