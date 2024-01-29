import { createAction, props } from '@ngrx/store';
import { User } from '../users.model';

export const loadUser = createAction('[User]] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>()
);

export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error : string }>()
  );
export const selectUser = createAction('[User] Select User', props<{ id: number }>());
export const editUser = createAction('[User] Edit User', props<{ id: number, newUser: any }>());
export const userEdited = createAction('[User] User Edited', props<{ newUser: any }>());
export const createUser = createAction('[User] Create User', props<{ newUser: any }>());
export const userCreated = createAction('[User] User Created', props<{ newUser: any }>());
