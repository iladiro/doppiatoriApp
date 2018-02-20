import { Component, OnInit } from '@angular/core';
import { DubberService } from '../dubber/dubbers.service';
import { FilmService } from '../film/film.service';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private filmService: FilmService,
    private dubberService: DubberService
  ) { }

  ngOnInit() {
    console.log(this.userService.getUserLoggedIn())
    this.filmService.getAll();
    this.dubberService.getAll();
  }

}
