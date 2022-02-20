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
  apiURL: string = environment.apiURL
  constructor(private http:HttpClient) { }

  getMovies(){

    return this.http.get<Decisions>(this.apiURL + 'Top250Movies/k_19lmdqtz/');
    //k_19lmdqtz
    //k_06em724z
  }

  postLiked(decisions:Decisions){

    return this.http.post(this.url + "decisions", decisions, {withCredentials: true});
  }

  getRoundMovies(round:number){

    return this.http.get<string[]>(this.url + "decisions/round/"+ round, {withCredentials: true}); 

  }

  getOneMovie(movie:string){
    return this.http.get(environment.apiURL + "title/k_19lmdqtz/"+ movie)
  }

  getWinner() {
    return this.http.get<string>(this.url + "decisions/winner", {withCredentials: true})
  }
}
