import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  url:any = environment.serverURL;
  user:any;
  user2:any;
  imdbId:Array<string> = [];
  list = document.getElementById("movieList");
  data:any;
  movie1:any;
  movie2:any;
  movie3:any;
  movie4:any;
  movie5:any;
  movie6:any;
  movie7:any;

  constructor(private router: Router, private cookieService: CookieService, private http:HttpClient, private favorite:FavoritesService) { }

  ngOnInit(): void {

    this.http.get(this.url + "user/current", {withCredentials: true}).subscribe({
      next: ()=>{
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        console.log("In Next");
        this.movie1 = this.user.favs[0].imdbId;
        this.movie2 = this.user.favs[1].imdbId;
        this.movie3 = this.user.favs[2].imdbId;
        this.movie4 = this.user.favs[3].imdbId;
        this.movie5 = this.user.favs[4].imdbId;
        this.movie6 = this.user.favs[5].imdbId;
        this.movie7 = this.user.favs[6].imdbId;
      },
      error:()=>{
        console.log("here")
        this.router.navigate([`login`]);
      },
      complete: ()=>{
        
      }
    })

    
    

    // for(var i = 0; i < this.user.favs.length; i++){
      
    //   this.imdbId[i] = this.user.favs[i].imdbId;

    // }

    

  }

}
