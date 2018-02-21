import { Component, OnInit } from '@angular/core';
import { Film } from '../_models/index';
import { FilmService } from '../_services/index';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})

export class FilmListComponent implements OnInit {

  constructor(private filmService: FilmService) {}

  onDelete(film) {
    this.filmService.delete(film);
  }

  ngOnInit() {
    this.filmService.getAll();
  }

}
