import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Favorites } from '../models/favorites';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class FavoritesService {

  url:string = environment.serverURL;
  
  constructor(private http:HttpClient, private cookieService:CookieService) { }


  postFavs(name:string){

    //let cookie:any = this.cookieService.get("upNext_user");
    //let options = new RequestOptions({ headers: headers, withCredentials: true });
    console.log(name);


    return this.http.post(this.url + "favorites", new Favorites(name), {observe:'response', withCredentials: true})
    

  }

  deleteFavs(){
    return this.http.post<User>(this.url + "favorites/delete", null, {observe:'response', withCredentials: true})
  }
  
}
