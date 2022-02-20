import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from 'src/app/event-emitter.service';
import { User } from 'src/app/models/user';
import { FavoritesService } from 'src/app/services/favorites.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Output()

  url:any = environment.serverURL;
  user:any;
  user2:any;
  user3:User = new User();
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
  movie8:any;
  movie9:any;
  username:any;
  firstName:any;
  lastName:any;
  email:any;
  clickEventSubscription:Subscription | undefined;

  constructor(
    private sharedService:SharedService, 
    private router: Router, 
    private cookieService: CookieService, 
    private http:HttpClient, 
    private favorite:FavoritesService,
    private modalService: NgbModal,
    private userService: UserService) { 
    
  }

  ngOnInit(): void {

    if(this.cookieService.get("upNext_user") == null){
      this.router.navigate([`login`]);
    }

    this.http.get<User>(this.url + "user/current", {withCredentials: true, observe:'response'}).subscribe({
      next: response=>{
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        this.user3 = response.body ?? new User();
        console.log(this.user3)
        console.log("In Next");
        this.movie1 = this.user.favs[0].imdbId;
        this.movie2 = this.user.favs[1].imdbId;
        this.movie3 = this.user.favs[2].imdbId;
        this.movie4 = this.user.favs[3].imdbId;
        this.movie5 = this.user.favs[4].imdbId;
        this.movie6 = this.user.favs[5].imdbId;
        this.movie7 = this.user.favs[6].imdbId;
        this.movie8 = this.user.favs[7].imdbId;
        this.movie9 = this.user.favs[8].imdbId;
      },
      error:()=>{
        console.log("here")
        this.router.navigate([`login`]);
      }
    })

    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.populateFavs();
    })

  }

  populateFavs(){
    
    this.user = JSON.parse(this.cookieService.get("upNext_user"));
    console.log("In Populate Favs Function!");
    this.movie1 = this.user.favs[0].imdbId;
    this.movie2 = this.user.favs[1].imdbId;
    this.movie3 = this.user.favs[2].imdbId;
    this.movie4 = this.user.favs[3].imdbId;
    this.movie5 = this.user.favs[4].imdbId;
    this.movie6 = this.user.favs[5].imdbId;
    this.movie7 = this.user.favs[6].imdbId;
    this.movie8 = this.user.favs[7].imdbId;
    this.movie9 = this.user.favs[8].imdbId;
  }

  deleteFavs(){

    this.favorite.deleteFavs().subscribe({

      next:(response)=>{
        this.cookieService.set("upNext_user", JSON.stringify(response.body));
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        console.log("deleting fav!");
        this.movie1 = " ";
        this.movie2 = " ";
        this.movie3 = " ";
        this.movie4 = " ";
        this.movie5 = " ";
        this.movie6 = " ";
        this.movie7 = " ";
        this.movie8 = " ";
        this.movie9 = " ";
        
      },
      error:()=>{console.log("something went wrong deleting your favs")}
    });
   

    this.user = JSON.parse(this.cookieService.get("upNext_user"));
    

  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    this.user = JSON.parse(this.cookieService.get("upNext_user"));
    this.movie1 = this.user.favs[0].imdbId;
    this.movie2 = this.user.favs[1].imdbId;
    this.movie3 = this.user.favs[2].imdbId;
    this.movie4 = this.user.favs[3].imdbId;
    this.movie5 = this.user.favs[4].imdbId;
    this.movie6 = this.user.favs[5].imdbId;
    this.movie7 = this.user.favs[6].imdbId;
    this.movie8 = this.user.favs[7].imdbId;
    this.movie9 = this.user.favs[8].imdbId;
  }

  open(content:any) {
    this.modalService.open(content).result.then(()=>{
      // this.user.firstName = this.firstName;
      // this.user.lastName = this.lastName;
      // this.user.email = this.email;
      // this.user.username = this.username;
      console.log(this.user3.firstName)
      console.log(this.user3)
      this.cookieService.set("upNext_user", JSON.stringify(this.user3));
      this.userService.updateUser(this.user3).subscribe(()=>{console.log("?????????")});
        this.user3.password="";
      }
    );
  }




  // for(var i = 0; i < this.user.favs.length; i++){
      
    //   this.imdbId[i] = this.user.favs[i].imdbId;

    // }
}
