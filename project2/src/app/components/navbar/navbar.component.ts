import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  url: string = environment.serverURL;

  constructor(private router: Router, private http:HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.http.post(this.url + "logout", {observe:'response', withCredentials:true}).subscribe({
      next:()=>{this.cookieService.delete("upNext_user")},
      complete:()=>{this.cookieService.delete("upNext_user")}
    });
    this.cookieService.delete("upNext_user");
    this.cookieService.deleteAll();
    console.log("Logged Out")
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
