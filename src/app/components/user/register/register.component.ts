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

  loading:boolean = false;
  private alert_message;

  constructor(
    private service: Service,
    private router: Router
  ) { }

  onCheck(form) {
    this.loading = true;
    this.service.getBy("users", "email", form.value.email).subscribe(
      already_registered => {
        this.loading = false;
        this.alert_message = "prohibition";
      },
      not_registered_yet => {
        this.onSubmit(form);
      }
    );
  }

  onSubmit(form) {
    let md5_psw = md5(form.value.secret);
    form.value.secret = md5_psw;
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

  ngOnInit() {}

}
