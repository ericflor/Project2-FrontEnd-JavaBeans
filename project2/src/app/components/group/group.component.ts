import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group:Group = new Group();
  user:User = new User();
  //inAGroup:boolean = false;

  constructor(private groupService:GroupService, private modalService: NgbModal, private cookieService: CookieService){}//, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get("upNext_user"));
    this.groupService.getGroup().subscribe({
      next:response=>{
        if(response.status==200){
          this.user.group = JSON.parse(JSON.stringify(response.body));
        }
      }, 
      error:()=>{this.user.group = new Group();}
    });
  }

  open(content:any) {
    this.modalService.open(content, {size: 'sm'}).result.then((result)=>{
      if(result="create"){
        this.createGroup()
      }else if(result="join"){
        this.joinGroup();
      }
    });
  }

  createGroup(){
    this.groupService.createGroup(this.user.group.name).subscribe({
      next:(response)=>{
        this.cookieService.set("upNext_user", JSON.stringify(response));
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        //this.inAGroup=true;
      } 
      //complete:()=>{this.activeModal.dismiss; console.log("dismiss?")}
    });
  }

  joinGroup(){

  }

  leaveGroup(){
      this.groupService.leaveGroup().subscribe({
        next:(response)=>{
          response.group = new Group();
          this.cookieService.set("upNext_user", JSON.stringify(response))
          this.user = JSON.parse(this.cookieService.get("upNext_user")) as User;
          console.log("Left "+this.user)
          //this.inAGroup=false;
        }
      });
  }

}
