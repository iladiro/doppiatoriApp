import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';
import { UserService } from '../users.service';

@Component({
  selector: 'users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService]
})
export class UsersListComponent implements OnInit {

  @Input() users: UserModel[];

  constructor() { }

  addUser(name, surname) {
    if (name && surname) {
      let lengthUsersIndex = this.users.length + 1;
      this.users.push({
        id: lengthUsersIndex,
        name: name,
        surname: surname
      });
    }
  };

  deleteUser(user) {
    console.log(user);
    let index = this.users.indexOf(user);
    this.users.splice(index, 1);
  };

  ngOnInit() {}

}
