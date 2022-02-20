import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.serverURL;

  constructor(private http:HttpClient) { }

  getCurrentUser(){
    return this.http.get<User>(this.url+"user/current", {withCredentials:true, observe:'response'});
  }

  updateUser(user:User){
    console.log(user)
    return this.http.post(this.url+"user/update", user, {withCredentials:true});
    
  }
}
