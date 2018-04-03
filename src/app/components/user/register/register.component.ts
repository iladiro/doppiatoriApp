import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { User } from '../_models/index';

// Services
import { UserService } from '../_services/index';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  model: any = {};
  loading = false;
  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  // getFirstChar(whichModel, property) {
  //   let createAvatar = whichModel.property.charAt(0);
  //   whichModel.avatar = createAvatar;
  // }

  register() {
    //this.getFirstChar(this.model, "name");
    this.model.id = Math.floor((Math.random() * 1000000) + 1);
    this.loading = true;
    let users_email = [];
    for(let user of this.users) {
      users_email.push(user.email);
    };
    if(users_email.includes(this.model.email)) {
      //this.alertService.error("You can't register this user because it's already used");
      this.loading = false;
      return;
    } else {
      this.userService.create(this.model).subscribe(
        data => {
          //this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        }
      );
    }
  }

  ngOnInit() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      }
    );
  }

}
