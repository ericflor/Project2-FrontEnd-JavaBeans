import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  
  
  constructor(private http:HttpClient) { }


  postFavs(){}

  getFavs(){}
  
}
