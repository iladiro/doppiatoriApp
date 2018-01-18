import { Component, OnInit } from '@angular/core';
import { DubberService } from '../dubber/dubbers.service';
import { FilmService } from '../film/film.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) { }

  ngOnInit() {
    this.filmService.getAll();
    this.dubberService.getAll();
  }

}
