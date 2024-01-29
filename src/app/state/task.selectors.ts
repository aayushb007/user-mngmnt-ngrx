import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state.interface";


export const selectFeature=(state:AppState)=> state.tasks;

export const isLoadingSelector = createSelector(selectFeature, state => state.isLoading);

export const tasksSelector = createSelector(selectFeature, state => state?.tasks);

export const errorSelector = createSelector(selectFeature, state => state.error);