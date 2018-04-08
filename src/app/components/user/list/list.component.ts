import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../_models/index';

// Services
import { UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];
  private DBTable:string = "users";
  private currentUser;

  dataForRequestSearchComp = {
    "table": "users",
    "parameter": "firstName"
  };

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor( private userService: UserService ) { }

  setConfirm(data) {
    if(data == "true") {
      this.delete(this.currentUser);
    }
  }

  passCurrentUser(user) {
    this.modalMessage.text = "Are you sure you want to delete this user?";
    this.currentUser = user;
  }

  private dataset(items) {
    this.users = items;
  }

  private delete(user) {
    let index = this.users.indexOf(user);
    this.userService.delete(user.id).subscribe(
      data => {
        this.users.splice(index, 1);
        this.alertMessage = {
          "text": "It has been deleted successfully!",
          "class": "success",
          "display": true
        }
      },
      err => {
        this.alertMessage = {
          "text": "Error",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  private setFoundValueFromSearch(value){
    this.users = value;
  }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => { this.users = data; }
    );
  }

}
