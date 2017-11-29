import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';
import { UserService } from '../users.service';

@Component({
  selector: 'users',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {

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
