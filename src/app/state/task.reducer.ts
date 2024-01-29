import { createReducer, on } from '@ngrx/store';

import * as TaskActions from './task.actions';
import { TasksState } from './tasks.state.interface';



export const initialState: TasksState = {
    isLoading:false,
    tasks: [],
    error:null
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.loadTasks,(state)=>({ ...state,isLoading: true})),
  on(TaskActions.loadTasksSuccess, (state, action) =>({
    ...state,
    isLoading: false,
    tasks:action.task,
  })),
  on(TaskActions.loadTasksFailure, (state, action) =>({
    ...state,
    isLoading: false,
    error:action.error,
  })),
  on(TaskActions.deleteTask, (state, action) => ({
    ...state,
    isLoading: true, // You might want to set isLoading to true while the deletion is in progress
  })),
  on(TaskActions.deleteTaskSuccess, (state, action) => ({
    ...state,
    isLoading: false, // Set isLoading back to false after the deletion is successful
    tasks: state.tasks.filter((task:any) => task.id !==action.taskId), // Remove the deleted task from the tasks array
  })),
  on(TaskActions.deleteTaskFailure, (state, action) => ({
    ...state,
    isLoading: false, // Set isLoading back to false in case of deletion failure
    error: action.error,
  })),
  on(TaskActions.addTask, (state, action) => ({
    ...state,
    isLoading: true, // You might want to set isLoading to true while the addition is in progress
  })),
  on(TaskActions.addTaskSuccess, (state, action) => ({
    ...state,
    isLoading: false, // Set isLoading back to false after the addition is successful
    tasks: [action.task ,...state.tasks], // Add the newTask to the tasks array
  })),
  on(TaskActions.addTaskFailure, (state, action) => ({
    ...state,
    isLoading: false, // Set isLoading back to false in case of addition failure
    error: action.error,
  }))

);
