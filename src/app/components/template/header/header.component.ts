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

  currentUser: User;

  constructor( private router: Router ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}

}
