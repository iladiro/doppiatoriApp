import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UserModel } from '../user-model';
import { UserService } from '../users.service';

@Component({
  //selector: 'app-user-profile-component',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
  providers: [UserService]
})

export class UserProfileComponent implements OnInit {

  @Input() usersList: UserModel[];

  @Input() user: {};

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.usersList = this.userService.getUser();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
       for (let item of this.usersList) {
         if(item.id == this.id) {
           this.user = item;
         }
       }
       // In a real app: dispatch action to load the details here.
    });
  }

}
