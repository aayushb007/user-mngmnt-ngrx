import { createAction, props } from '@ngrx/store';
import { Task } from './task.model';

// Load Tasks
export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ task: Task[] }>()
);

export const loadTasksFailure = createAction(
    '[Tasks] Load Tasks Failure',
    props<{ error : string }>()
  );
// Add Task
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
    '[Task] Add Task Failure',
    props<{ error: string }>()
  );
// Update Task
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>()
);

// Delete Task
export const deleteTask = createAction(
    '[Task] Delete Task',
    props<{ taskId: string }>()
  );
  
  export const deleteTaskSuccess = createAction(
    '[Task] Delete Task Success',
    props<{ taskId: string }>()
  );
  
  export const deleteTaskFailure = createAction(
    '[Task] Delete Task Failure',
    props<{ error: string }>()
  );
