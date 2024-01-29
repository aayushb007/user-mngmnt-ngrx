export interface UsersState{
    isLoading: boolean;
    users: any[];
    error: string | null ;
}


export interface AppState{
    users:UsersState;
}