import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from './user-model';
import { UserService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})

export class AppComponent {
  //usersList: UserModel[];

  // constructor(private userService: UserService) {
  //   this.usersList = this.userService.getUser();
  // }

  constructor() {}
}
