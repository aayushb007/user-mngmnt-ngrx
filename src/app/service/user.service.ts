import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, catchError, map } from 'rxjs';
import { Task } from '../users.model';
import { HttpClient } from '@angular/common/http';
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
  userChanged = new Subject<any[]>();
  userSelected = new EventEmitter<any>();
  constructor(private http:HttpClient,private router:Router) { }
  url = "http://localhost:3005/users";
  isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
  }
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
    
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.router.navigate(['/login'])

  }
  login(email: string, password: string): Observable<LoginResponse>  {{
    console.log('Wow.................. service called');
    
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
