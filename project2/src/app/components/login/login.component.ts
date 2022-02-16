import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private cookieService: CookieService, private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    this.httpClient.post(this.url + "login", {"username":this.username, "password":this.password}).subscribe({
      next:(data:any)=>{this.cookieService.set('upNext_user', data)},
      error:()=>{console.log("nope")}
    });
    console.log("nada");
  }

}
