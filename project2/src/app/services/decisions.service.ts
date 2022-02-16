import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
<<<<<<< HEAD
    return this.http.get<Decisions[]>(this.url + "decisions");
  }

  postLiked(name:String){
=======
    //return this.http.get<Decisions>(this.url + "decisions");
    return this.http.get<Decisions>(this.apiURL);
  }

  postLiked(imdbId:string){
>>>>>>> 2588379a8022015d829c8ab4be26af281d52343a

    return this.http.post(this.url + "decisions", new Decisions("", 1, imdbId, true, 1));

  }
}
