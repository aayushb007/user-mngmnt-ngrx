import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TaskService } from '../service/task.service';
import * as TaskActions from './task.actions';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((task:any) => TaskActions.loadTasksSuccess({ task:task.task })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap((action) =>
        this.taskService.addTask(action.task).pipe(
          map(() => TaskActions.addTaskSuccess({ task: action.task }))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map(() => TaskActions.updateTaskSuccess({ task }))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.taskId).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskId: action.taskId })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private taskService: TaskService) {}
}
