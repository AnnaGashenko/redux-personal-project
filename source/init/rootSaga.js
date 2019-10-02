// Core
import { all, call } from 'redux-saga/effects';

// Watcher
import { watchTask } from '../bus/tasks/saga/watchers';

export function* rootSaga () {
    yield all([
        call(watchTask),
    ]);
}
