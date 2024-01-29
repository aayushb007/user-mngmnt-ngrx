import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UsersState } from './task.state.interface';

export const initialState:UsersState = {
  isLoading:false,
  users: [],
  error:null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser,(state)=>(

    
    { ...state,isLoading: true})),
  on(UserActions.loadUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users:action.users
  })),
  // on(UserActions.selectUser, (state, { id }) => state.find(user => user.id === id)),
  // on(UserActions.userEdited, (state, { newUser }) => state.map(user => (user.id === newUser.id ? newUser : user))),
  // on(UserActions.userCreated, (state, { newUser }) => [...state, newUser])
);
