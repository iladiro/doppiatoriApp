import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../user/_models/index';
import { Dubber } from '../dubber/_models/index';
import { Film } from '../film/_models/index';

// Services
import { DubberService } from '../dubber/_services/dubbers.service';
import { FilmService } from '../film/_services/index';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  current_user: User;
  dubbers: Dubber[] = [];
  films: Film[] = [];

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
  }

  ngOnInit() {
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }
}
