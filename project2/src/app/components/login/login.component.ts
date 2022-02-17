import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Favorites } from 'src/app/models/favorites';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = '';
  password: String = '';
  url: String = environment.serverURL;
  user:User = new User(0, "", "", "", new Group(0, "", true),0, "", Array<Favorites>(new Favorites("")));


  constructor(private cookieService: CookieService, private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    this.httpClient.post<User>(this.url + "login", {"username":this.username, "password":this.password}, {observe:'response', withCredentials:true}).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.user = data.body; 
        this.cookieService.set("upNext_user", data.headers.get("Set-Cookie"));
        console.log(this.cookieService.get("upNext_user"));
        console.log(this.user)},
      error:()=>{console.log("nope")},
      complete: ()=>{console.log(this.cookieService.get("upNext_user"));}
    });
    console.log("nada");
    

  }

}
