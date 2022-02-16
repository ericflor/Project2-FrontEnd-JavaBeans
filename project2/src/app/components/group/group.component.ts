import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupName:string = '';
  inAGroup:boolean = false;
  group:Group = new Group(0, "", true);

  constructor(private groupService:GroupService, private modalService: NgbModal){}//, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {size: 'sm'}).result.then(()=>{this.createGroup()});
  }

  createGroup(){
    this.groupService.createGroup(this.groupName).subscribe({
      next:(group:Group)=>{this.inAGroup=true} 
      //complete:()=>{this.activeModal.dismiss; console.log("dismiss?")}
    });
  }

  joinGroup(){

  }

  leaveGroup(){

  }

}
