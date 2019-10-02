// Core
import { put, apply } from 'redux-saga/effects'

// Instruments
import { api } from '../../../../REST';
import { taskActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* createTask ({ payload: comment }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(api, api.tasks.create, [comment]);
        const { data: post, message } = yield apply(response, response.json);

        if(response.status !== 200) {
            throw new Error(message);
        }

        yield put(taskActions.createTask(post));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> create worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
