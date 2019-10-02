// Types
import { types } from './types';

export const taskActions = {
    fillTasks : ( tasks ) => {
        return {
            type: types.FILL_TASKS,
            payload: tasks,
        }
    },

    createTask : ( task ) => {
        return {
            type: types.CREATE_TASK,
            payload: task,
        }
    },

    removeTask : ( id ) => {
        return {
            type: types.REMOVE_TASK,
            payload: id,
        }
    },

    updateTask : ( tasks ) => {
        return {
            type: types.UPDATE_TASK,
            payload: tasks,
        }
    },

    completedAllTask : ( ) => {
        return {
            type: types.COMPLETED_ALL_TASK,
        }
    },

    // Async
    fetchTasksAsync : () => {
        return {
            type: types.FETCH_TASKS_ASYNC,
        };
    },

    createTaskAsync : ( comment ) =>  {
        return {
            type: types.CREATE_TASK_ASYNC,
            payload: comment,
        };
    },

    removeTaskAsync : ( taskId ) =>  {
        return {
            type: types.REMOVE_TASK_ASYNC,
            payload: taskId,
        };
    },

    updateTaskAsync : ( task ) =>  {
        return {
            type: types.UPDATE_TASK_ASYNC,
            payload: task,
        };
    },

    completedAllTaskAsync : ( task ) =>  {
        return {
            type: types.COMPLETED_ALL_TASK_ASYNC,
            payload: task,
        };
    },

};
