import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { md5 } from '../../../helpers/md5';

// Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading:boolean = false;
  private alert_message;

  constructor(
    private router: Router,
    private service: Service
  ) { }

  login(form) {
    this.loading = true;
    let md5_psw = md5(form.value.secret);
    form.value.secret = md5_psw;
    this.service.getBy("users", "email", form.value.email).subscribe(
      data => {
        console.log(data);
        if(data.secret === form.value.secret) {
          localStorage.setItem('userToken', form.value.secret);
          this.router.navigate(['/']);
        } else {
          this.alert_message = "access-denied";
        }
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
        this.loading = false;
      }
    );
  }

  ngOnInit() {
  }

}
