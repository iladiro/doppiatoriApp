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
  date = new Date();

  constructor(
    private router: Router,
    private service: Service
  ) { }

  redirect(hash_password, user_obj) {
    console.log(typeof user_obj.secret);
    console.log(typeof hash_password);
    if(user_obj.secret === hash_password) {
      console.log("uguali");
      let expire_date = this.date.setHours(this.date.getHours() + 2);
      localStorage.setItem('userToken', hash_password);
      localStorage.setItem('expires', (expire_date).toString());
      this.router.navigate(['/']);
    } else {
      console.log("diversi");
      this.alert_message = "access-denied";
    }
  }

  login(form) {
    this.loading = true;
    let md5_psw = md5(form.value.secret);
    form.value.secret = md5_psw;
    this.service.getBy("users", "email", form.value.email).subscribe(
      data => {
        console.log(data);
        this.redirect(form.value.secret, data);
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
        this.loading = false;
      }
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userToken');
    localStorage.removeItem('expires');
  }

  ngOnInit() {
    this.logout();
  }

}
