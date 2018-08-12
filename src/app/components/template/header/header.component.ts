import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

// Models
import { User } from '../../user/_models/index';

// Services
import { SetGetService } from '../../../services/set_get.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  current_user: User;

  constructor(
    private data_service: SetGetService,
    private router: Router
  ) {}

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('expires');
    this.router.navigate(['/signin']);
  }

  ngOnInit() {
    this.current_user = this.data_service.get();
  }

}
