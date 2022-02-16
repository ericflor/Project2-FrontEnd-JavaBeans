import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  url:string = environment.serverURL;
  constructor(private http:HttpClient) { }

  // getMovies(){
  //   return this.http.get
  // }

  
}
