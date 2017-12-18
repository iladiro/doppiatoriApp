import { Component, OnInit } from '@angular/core';
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  providers: [FilmService]
})

export class FilmListComponent implements OnInit {

  currentItem;

  constructor(private filmService: FilmService) {}

  onDelete(film) {
    this.filmService.deleteFilm(film);
  }

  getSingleItem(film) {
    this.currentItem = film;
  }

  ngOnInit() {
    this.filmService.getFilms();
  }

}
