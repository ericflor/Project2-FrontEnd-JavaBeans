import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DecisionsComponent } from '../decisions/decisions.component';
import { Decisions } from '../models/decisions';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  url:string = environment.serverURL;
  constructor(private http:HttpClient) { }

  getMovies(){
    return this.http.get<Decisions>(this.url + "decisions");
  }

  postLiked(name:String){

    return this.http.post(this.url + "decisions", new Decisions(0, 1, name, true, 1));

  }
}
