import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

// Models
import { User } from '../../user/_models/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //current_user: User;
  private current_user = JSON.parse(sessionStorage.getItem('user'));

  constructor(
    private router: Router
  ) {}

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('expires');
    this.router.navigate(['/signin']);
  }

  ngOnInit() {}

}
