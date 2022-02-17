import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url: String = environment.serverURL;

  constructor(private http:HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.http.post(this.url + "logout", {observe:'response', withCredentials:true}).subscribe({
      next: response=>{console.log(response), this.cookieService.deleteAll()}
      
    });
    console.log("Logged Out")
  }

}
