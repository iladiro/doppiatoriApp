import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';
import { UserService } from '../users.service';
import {NgForm} from '@angular/forms';

@Component({
  // selector: 'router-outlet',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService]
})

export class UsersListComponent implements OnInit {

  //@Input() usersList: UserModel[];

  constructor(private userService: UserService) {}

  onSubmit(form: NgForm){
    let currentUser = form.value;
    let lengthUsersIndex = Math.floor((Math.random() * 1000000) + 1);
    let user:UserModel{} = {
      id: lengthUsersIndex,
      name: currentUser.name,
      surname: currentUser.surname,
      age: currentUser.age,
      gender: currentUser.gender,
      nationality: currentUser.nationality,
      photo: currentUser.photo
    };
    this.userService.addUser(user);
  }

  onDelete(user) {
    this.userService.deleteUser(user);
  }

  ngOnInit() {
    this.userService.getUsers();
  }

}
