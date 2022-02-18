import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:any;
  user2:any;
  imdbId:Array<string> = [];

  constructor(private cookieService: CookieService, private http:HttpClient) { }

  ngOnInit(): void {

    this.user = JSON.parse(this.cookieService.get("upNext_user"));
    console.log(this.user);


    for(var i = 0; i < this.user.favs.length; i++){
      this.imdbId[i] = this.user.favs[i].imdbId;
    }
    
    

  }

  //

}
