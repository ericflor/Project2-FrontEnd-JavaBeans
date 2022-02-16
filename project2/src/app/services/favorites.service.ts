import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Favorites } from '../models/favorites';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {

  url:string = environment.serverURL;
  
  constructor(private http:HttpClient) { }


  postFavs(name:string){

    return this.http.post(this.url + "favorites", new Favorites(0, name, 1));

  }

  getFavs(){}
  
}
