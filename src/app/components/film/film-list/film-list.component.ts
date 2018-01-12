import { Component, OnInit } from '@angular/core';
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  providers: [FilmService]
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
