import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../users.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userChanged = new Subject<any[]>();
  userSelected = new EventEmitter<any>();
  constructor(private http:HttpClient) { }
  url = "http://localhost:3005/users";
  getUsers(obj: any):Observable<any[]>{
    console.log('yes going ');
    
    return this.http.get<any[]>(`${this.url}?page=${obj.page}&limit=${obj.limit}`);
  }
  getUserDetail(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)

  }
  editUser(id: number, newUser:any){
    return this.http
    .put(`${this.url}/${id}`, newUser);
  }
  createUser(newUser:any){
    return this.http
    .post(`${this.url}`, newUser);
  }
  deleteUser(id:any):Observable<void>{
    return this.http.delete<any>(`${this.url}/${id}`)

  }

}