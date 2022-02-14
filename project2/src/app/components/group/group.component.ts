import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupName:string = '';
  inAGroup:boolean = false;

  constructor(private groupService:GroupService) { }

  ngOnInit(): void {
  }

  createGroup(){
    this.groupService.createGroup(this.groupName).subscribe({next:()=>{this.inAGroup=true}})
  }

  joinGroup(){
    
  }

  leaveGroup(){

  }

}
