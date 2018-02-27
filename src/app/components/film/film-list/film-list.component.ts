import { Component, OnInit } from '@angular/core';
import { Film } from '../_models/index';
import { FilmService } from '../_services/index';

@Component({
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})

export class FilmListComponent implements OnInit {

  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  delete(film) {
    let index = this.films.indexOf(film);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.filmService.delete(film.id).subscribe(
        data => {
          this.films.splice(index, 1);
        }
      );
    }
  }

  ngOnInit() {
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
  }

}
