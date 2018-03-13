import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  private currentUser;
  private message = {
    "alert": {
      "text": "",
      "class": ""
    },
    "modal": {
      "text": "",
      "response": ""
    }
  };

  constructor( private userService: UserService ) { }

  setConfirm(data) {
    if(data == "true") {
      this.delete(this.currentUser);
    }
  }

  passCurrentUser(user) {
    this.message.modal.text = "Are you sure you want to delete this user?";
    this.currentUser = user;
  }

  private delete(user) {
    let index = this.users.indexOf(user);
    this.userService.delete(user.id).subscribe(
      data => {
        this.users.splice(index, 1);
        this.message.alert.text = "It has been deleted successfully!";
        this.message.alert.class = "success";
      },
      err => {
        this.message.alert.text = "Error";
        this.message.alert.class = "danger";
      }
    );
  }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => { this.users = data; }
    );
  }

}
