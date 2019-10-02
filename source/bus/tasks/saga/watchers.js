// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../types';

// Workers
import { fetchTasks, createTask, removeTask, updateTasks, completedAllTask } from './workers';

function* watchFetchTasks() {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks);
}

function* watchCreateTask() {
    yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchRemoveTask() {
    yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

function* watchUpdateTasks() {
    yield takeEvery(types.UPDATE_TASK_ASYNC, updateTasks);
}

function* watchCompletedAllTasks() {
    yield takeEvery(types.COMPLETED_ALL_TASK_ASYNC, completedAllTask);
}

export function* watchTask() {
    yield all([
        call(watchFetchTasks),
        call(watchCreateTask),
        call(watchRemoveTask),
        call(watchUpdateTasks),
        call(watchCompletedAllTasks),
    ])
}
