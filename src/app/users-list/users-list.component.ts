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

  @Input() users: UserModel;

  userService: UserService;

  constructor() { }

  addUser(newUser) {
    if (newUser) {
      this.users.push({name: newUser});
      console.log(this.users);
    }
  }

  ngOnInit() {}

}
