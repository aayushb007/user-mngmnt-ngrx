import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, catchError, map } from 'rxjs';
import { Task } from '../users.model';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
interface LoginResponse {
  token: string;
  email: string;
   user: any ;
}
@Injectable({
  providedIn: 'root'
})


export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('token') || ''
    })
  }
  userChanged = new Subject<any[]>();
  userSelected = new EventEmitter<any>();
  constructor(private http:HttpClient,private router:Router) { }
  url = "http://localhost:3005/users";

  isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
  }

  getUsers(obj: any):Observable<any[]>{
    return this.http.get<any[]>(`${this.url}?page=${obj.page || 1}&limit=${obj.limit || 100}`,this.httpOptions);
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
    
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.router.navigate(['/login'])
  }

  login(email: string, password: string): Observable<LoginResponse>  {{
   const credentials = { email, password };
   return this.http.post<LoginResponse>(`${this.url}/login`, credentials)
   .pipe(
    map((res) => {
    console.log(res.token);
      return res;}),
    catchError((error)=>{
      console.log('Login Error:',error );
      throw error
    })
   )
  }
}
}
