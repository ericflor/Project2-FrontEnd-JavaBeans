import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Favorites } from 'src/app/models/favorites';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String = '';
  password: String = '';
  url: String = environment.serverURL;
  user:User = new User();
  show:boolean =false;
  show2:boolean = false;
  loginUser:any;


  constructor(private router: Router, private route: ActivatedRoute, private cookieService: CookieService, private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    this.httpClient.post<User>(this.url + "login", {"username":this.username, "password":this.password}, {observe:'response', withCredentials:true}).subscribe({
      next:(data:any)=>{
        this.user = data.body;

        this.cookieService.set("upNext_user", JSON.stringify(data.body));
    
        if(this.user != null){ 
          console.log("logged in!");
          this.router.navigate(['user']); // if login succesful, route to user-profile page
        }

       
        //console.log(this.cookieService.get("upNext_user"));
        //console.log(this.user)
      },
      error:()=>{this.show2 = true; console.log("Invalid Credentials")},
      complete: ()=>{
        //JSON.parse(this.cookieService.get("upNext_user"));
        //console.log(JSON.parse(this.cookieService.get("upNext_user")));
      }
    });
  }

  signup(){
    console.log("clicked sign up");
    console.log(this.user);
    this.httpClient.post(this.url + "user", this.user, {observe:'response', withCredentials:true}).subscribe({
      next: response=>{this.show = true; console.log(response)},
      error: response=>{console.log("Error "+response)}
    });
  }

}
