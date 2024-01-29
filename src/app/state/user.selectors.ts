import { createSelector } from "@ngrx/store";

export const selectUser=(state:any)=> state.users;

export const isLoadingSelector = createSelector(selectUser, state => state.isLoading);

export const usersSelector = createSelector(selectUser, state => state.users);

export const errorSelector = createSelector(selectUser, state => state.error);