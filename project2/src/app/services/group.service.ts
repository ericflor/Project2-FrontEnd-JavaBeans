import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url:string = environment.serverURL;

  constructor(private http:HttpClient) { }

  getGroup(){
    return this.http.get<Group>(this.url+"group", {observe:"response", withCredentials:true, responseType:"json"});
  }

  createGroup(name:string){
    return this.http.post<User>(this.url+"group", new Group({name:name, open:true}), {withCredentials:true});
  }

  joinGroup(id:number){
    return this.http.put<User>(this.url+"group/join/"+id, null, {withCredentials:true})
  }

  updateGroup(group:Group){
    return this.http.put<User>(this.url+"group", group, {withCredentials:true});
  }

  leaveGroup(){
    return this.http.put<User>(this.url+"group/leave", null, {withCredentials:true});
  }
}
