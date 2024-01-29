import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../users.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskChanged = new Subject<any[]>();
  taskSelected = new EventEmitter<any>();
  constructor(private http:HttpClient) { }
  url = "http://localhost:3005/tasks"
  getTasks(obj: any):Observable<any[]>{
    console.log('yes going');
    
    return this.http.get<Task[]>(`${this.url}?page=${obj.page}&limit=${obj.limit}`).pipe(
      map((response: any) => {
        this.taskChanged.next(response)
        return response;
      })
    );
  }
  getTaskDetail(id:number):Observable<any>{
    return this.http.get<Task>(`${this.url}/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );

  }
  editTask(id: number, newTask: Task){
    return this.http
    .put(`${this.url}/${id}`, newTask);
  }
}
