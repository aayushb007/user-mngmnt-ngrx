import { Task } from "./task.model";

export interface TasksState{
    isLoading:boolean;
    tasks: Task[];
    error: string | null
}