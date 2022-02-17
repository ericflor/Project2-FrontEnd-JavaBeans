import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:any;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {

    //console.log(this.cookieService.get("upNext_user"));

    this.user = JSON.parse(this.cookieService.get("upNext_user"));
    console.log(this.user);



    //this.username = this.cookieService.get("upNext_user");
    //this.cookieData = this.cookieService.get("upNext_user");
    //this.username = this.cookieData.username;
  }

}
