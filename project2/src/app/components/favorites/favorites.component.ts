import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Favorites } from 'src/app/models/favorites';
import { User } from 'src/app/models/user';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SharedService } from 'src/app/event-emitter.service';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})



export class FavoritesComponent implements OnInit {

  @Input()
  userProfile: UserProfileComponent | undefined;

  userTry:any = UserProfileComponent;

  url:string = "https://imdb-api.com/en/API/SearchMovie/k_19lmdqtz/";
  movie: any;
  searchName: string = '';
  user:User = new User();
  

  constructor(private sharedService:SharedService, private favoriteService:FavoritesService, private http:HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
    
    
  }

  sendFavs(){
    
    this.sharedService.sendClickEvent();
    console.log("sending fav!")
  }

  

  searchFavs(search:string){

    this.searchName = search;

    this.http.get(this.url + search).subscribe(data=>{
      
      this.movie = data as any;
      console.log(this.movie);
    });
  }

  addFav1(){
    
    this.favoriteService.postFavs(this.movie.results[0].title).subscribe({
      next:(response)=>{
        console.log("added a new fav!");
        console.log(this.movie.results[0].title);
        this.cookieService.set("upNext_user", JSON.stringify(response.body));
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        console.log(this.user);
        this.sharedService.sendClickEvent();
        console.log("sending fav!");
        
      },
      error:()=>{console.log("something went wrong faving your movie: " + this.movie.results[0].title)}
    });
  }

  addFav2(){ 
    
    this.favoriteService.postFavs(this.movie.results[1].title).subscribe({
      next:(response)=>{
        console.log("added a new fav!");
        console.log(this.movie.results[1].title);
        this.cookieService.set("upNext_user", JSON.stringify(response.body));
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        console.log(this.user);
        this.sharedService.sendClickEvent();
        console.log("sending fav!");
        
      },
      error:()=>{console.log("something went wrong faving your movie: " + this.movie.results[1].title)}
    });
  }

  addFav3(){
    
    this.favoriteService.postFavs(this.movie.results[2].title).subscribe({
      next:(response)=>{
        console.log("added a new fav!");
        console.log(this.movie.results[2].title);
        this.cookieService.set("upNext_user", JSON.stringify(response.body));
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        console.log(this.user);
        this.sharedService.sendClickEvent();
        console.log("sending fav!");
        
      },
      error:()=>{console.log("something went wrong faving your movie: " + this.movie.results[2].title)}
    });
  }

}
