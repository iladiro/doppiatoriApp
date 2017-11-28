import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';

@Component({
  selector: 'users',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() users: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
