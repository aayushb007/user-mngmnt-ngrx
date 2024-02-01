import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../state/task.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskChanged = new Subject<any[]>();
  taskSelected = new EventEmitter<any>();
  constructor(private http:HttpClient) { }
  apiUrl = "http://localhost:3005/tasks";
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`);
  }

  addTask(task: Task): Observable<Task> {
    console.log('service called');
    
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }
  getTaskDetail(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`)

  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.userId}`, task);
  }

  deleteTask(id:any): Observable<void> {
    console.log(' delete service called');

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // getTasks(obj: any):Observable<any[]>{
  //   console.log('yes going');
    
  //   return this.http.get<Task[]>(`${this.url}?page=${obj.page}&limit=${obj.limit}`)
  // }
  // getTaskDetail(id:number):Observable<any>{
  //   return this.http.get<Task>(`${this.url}/${id}`).pipe(
  //     map((response: any) => {
  //       console.log(response);
  //       return response;
  //     })
  //   );

  // }
  // editTask(id: number, newTask: Task){
  //   return this.http
  //   .put(`${this.url}/${id}`, newTask);
  // }
  // addTask(task: Task): Observable<Task> {
  //   console.log('service called');
  //   return this.http.post<Task>(`${this.url}`, task);
  // }
  // deleteTask(id:any): Observable<void> {
  //   console.log(' delete service called');
  //   return this.http.delete<void>(`${this.url}/${id}`);
  // }
}
