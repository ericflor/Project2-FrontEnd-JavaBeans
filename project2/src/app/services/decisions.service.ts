import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DecisionsComponent } from '../decisions/decisions.component';
import { Decisions } from '../models/decisions';

@Injectable({
  providedIn: 'root'
})
export class DecisionsService {

  url: string = environment.serverURL;
  apiURL: string = "https://imdb-api.com/en/API/Top250Movies/k_06em724z/"
  constructor(private http:HttpClient) { }

  getMovies(){
    //return this.http.get<Decisions>(this.url + "decisions");
    return this.http.get<Decisions>(this.apiURL);
  }

  // postLiked(decisions:Decisions):Observable<Decisions>{
  //   let body:Decisions=decisions;
  //   console.log(body);
    
  //   return this.http.post<Decisions>(this.url + "decisions", body);
  //   // return this.http.post(this.url + "decisions", decisions, {withCredentials: true});
  // }
  postLiked(decisions:Decisions){

    console.log(decisions)
    return this.http.post(this.url + "decisions", decisions, {withCredentials: true});

  }
}
