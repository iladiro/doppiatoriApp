import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { md5 } from '../../../helpers/md5';

// Models
import { User } from '../_models/index';

// Services
import { Service } from '../../../services/index';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  loading = false;
  users: User[] = [];
  private alert_message;

  constructor(
    private service: Service,
    private router: Router
  ) { }

  register(form) {
    this.loading = true;
    let users_email = [];
    let md5_psw = md5(form.value.secret);
    form.value.secret = md5_psw;
    for(let user of this.users) {
      users_email.push(user.email);
    };
    if(users_email.includes(form.value.email)) {
      this.alert_message = "prohibition";
      this.loading = false;
      return;
    } else {
      this.service.create("users", form.value).subscribe(
        data => {
          form.reset();
          this.router.navigate(['/signin']);
        },
        err => {
          console.log(err);
          this.alert_message = "rejected";
          this.loading = false;
        }
      );
    }
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("users", "users", "all");
  }

}
