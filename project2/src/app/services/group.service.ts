import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url:string = environment.serverURL;

  constructor(private http:HttpClient) { }

  getGroup(){
    return this.http.get<Group>(this.url+"group");
  }

  createGroup(name:string){
    return this.http.post<Group>(this.url+"group", new Group(0, name, true));
  }

  updateGroup(group:Group){
    return this.http.put(this.url+"group", group);
  }
}
