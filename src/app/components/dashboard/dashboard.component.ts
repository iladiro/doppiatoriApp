import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../user/_models/index';
import { Dubber } from '../dubber/_models/index';
import { Film } from '../film/_models/index';

// Services
import { Service } from '../../services/index';
import { DubberService } from '../dubber/_services/dubbers.service';
import { FilmService } from '../film/_services/index';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  current_user: User;
  // dubbers: Dubber[] = [];
  dubbers: any = [];
  // films: Film[] = [];
  films: any = [];

  constructor(
    private service: Service,
    private filmService: FilmService,
    private dubberService: DubberService
  ) {
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
  }

  ngOnInit() {
    this.service.getAll("films", "all").subscribe(
      data => { this.films = data; }
    );
    this.service.getAll("dubbers", "all").subscribe(
      data => { this.dubbers = data; }
    );
  }
}
