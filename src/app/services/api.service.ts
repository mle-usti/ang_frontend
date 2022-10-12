import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private REST_API_SERVER = "http://127.0.0.1:8000/";
  constructor(private httpClient: HttpClient) { }

  getTypeRequest(url:string) {
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url:string, payload:any) {
    return this.httpClient.post(this.REST_API_SERVER+url, payload, httpOptions).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url:string, payload:any) {
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => {
      return res;
    }))
  }  
  deleteTypeRequest(url:string) {
    return this.httpClient.delete(this.REST_API_SERVER+url).pipe(map(res => {
      return res;
    }))
  } 
}