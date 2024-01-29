// user.effects.ts

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(action =>
        this.userService.getUsers(action).pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of( UserActions.loadUsersFailure({ error : error.message}) ))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      mergeMap(action =>
        this.userService.editUser(action.id, action.newUser).pipe(
          map(newUser => UserActions.userEdited({ newUser })),
          catchError(error => of(/* Handle error here */))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(action =>
        this.userService.createUser(action.newUser).pipe(
          map(newUser => UserActions.userCreated({ newUser })),
          catchError(error => of(/* Handle error here */))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
