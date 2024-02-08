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
  addFeature(feature : any): Observable<any>{
    return this.http.post<any>(`${this.url}`, feature);

  }
  getFeatureDetail(id:number):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }
  
  deleteFeature(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }
  editFeature(id: number, newTask: any){
    return this.http
    .put(`${this.url}/${id}`, newTask);
  }
}
