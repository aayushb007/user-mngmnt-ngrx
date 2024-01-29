import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Task } from '../users.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  featureChanged = new Subject<any[]>();
  featureSelected = new EventEmitter<any>();
  constructor(private http:HttpClient) { }
  url = "http://localhost:3005/features"
  getFeatures(obj: any):Observable<any[]>{
    return this.http.get<any[]>(`${this.url}?page=${obj.page}&limit=${obj.limit}`).pipe(
      map((response: any) => {
        this.featureChanged.next(response)
        return response;
      })
    );
  }
  getFeatureDetail(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );

  }
  editFeature(id: number, newTask: any){
    return this.http
    .put(`${this.url}/${id}`, newTask);
  }
}
