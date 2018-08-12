import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { md5 } from '../../../helpers/md5';

// Services
import { Service } from '../../../services/index';
import { SetGetService } from '../../../services/set_get.service';

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
    private service: Service,
    private data_service: SetGetService
  ) { }

  redirect(hash_password, user_obj) {
    if(user_obj.secret === hash_password) {
      let expire_date = this.date.setHours(this.date.getHours() + 2);
      sessionStorage.setItem('userToken', hash_password);
      sessionStorage.setItem('expires', (expire_date).toString());
      this.router.navigate(['/']);
    } else {
      this.loading = false;
      this.alert_message = "access-denied";
    }
  }

  login(form) {
    this.loading = true;
    let md5_psw = md5(form.value.secret);
    form.value.secret = md5_psw;
    this.service.getBy("users", "email", form.value.email).subscribe(
      data => {
        this.data_service.set(data);
        this.redirect(form.value.secret, data);
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
        this.loading = false;
      }
    );
  }

  ngOnInit() {
    //this.logout();
    if((sessionStorage.getItem('userToken') != null) && (this.date.getTime() < Number(sessionStorage.getItem('expires')))) {
      this.router.navigate(['/']);
    }
  }

}
