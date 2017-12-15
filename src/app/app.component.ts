import { Component, OnInit, Input } from '@angular/core';
// import { UserModel } from './components/dubber/dubber-model';
// import { UserService } from './components/dubber/dubbers.service';
//import { HeaderComponent } from './components/template/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  //providers: [UserService]
})

export class AppComponent {
  //usersList: UserModel[];

  // constructor(private userService: UserService) {
  //   this.usersList = this.userService.getUser();
  // }

  constructor() {}
}
