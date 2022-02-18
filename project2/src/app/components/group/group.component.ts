import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group:Group = new Group();
  user:User = new User();
  errorMessage:string = "";
  @ViewChild('joinIn', { read: TemplateRef }) joinIn!:TemplateRef<any>;
  @ViewChild('applyUpdates', { read: TemplateRef }) applyUpdates!:TemplateRef<any>;
  //inAGroup:boolean = false;

  constructor(
    private groupService:GroupService, 
    private userService:UserService,
    private modalService: NgbModal, 
    private cookieService: CookieService,
    ){}

    

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: response=>{
        this.user = response.body ?? new User;
        console.log(this.user)
        if(response.body?.group==null){
          this.user.group = new Group;
          console.log(this.user)
        }
      }
    })
  }

  open(content:any) {
    this.modalService.open(content, {size: 'sm'}).result.then((result)=>{
      if(result=="create"){
        this.createGroup()
      }else if(result=="join"){
        this.errorMessage="";
        this.joinGroup();
      }else if(result=="update"){
        this.errorMessage = "";
        this.updateGroup();
      }
    });
  }

  createGroup(){
    this.groupService.createGroup(this.user.group.name).subscribe({
      next: response=>{this.user = response}
    });
  }

  joinGroup(){
    this.groupService.joinGroup(this.user.group.id).subscribe({
      next:response=>{this.user = response},
      error:()=>{
        this.user.group.id = 0;
        this.errorMessage = "Sorry, that group is not accepting new users right now."
        this.open(this.joinIn)}
    })
  }

  updateGroup(){
    console.log(this.user.group)
    this.groupService.updateGroup(this.user.group).subscribe({
      next: response=>{
        this.user = response;
        console.log("update succeeded");
        console.log(this.user);
      },
      error: ()=>{
        this.errorMessage = "Something went wrong!"
        this.open(this.applyUpdates);
      }
    })
  }

  leaveGroup(){
      this.groupService.leaveGroup().subscribe({
        next:(response)=>{
          response.group = new Group();
          this.user = response;
        }
      });
  }

}
