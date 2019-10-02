// Core
import { put, apply } from 'redux-saga/effects'

// Instruments
import { api } from '../../../../REST';
import { taskActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* removeTask ({ payload: id }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.remove, [id]);

        if(response.status !== 204) {
            throw new Error(message);
        }

        console.log(id);
        yield put(taskActions.removeTask(id));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> remove task worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
