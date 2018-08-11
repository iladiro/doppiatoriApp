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

  current_user: User;

  constructor( private router: Router ) {
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('expires');
  }

  ngOnInit() {}

}
