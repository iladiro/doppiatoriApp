import { Component, OnInit, Input } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'addFilm',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})

export class AddFormComponent implements OnInit {

  @Input() film;

  constructor(private filmService: FilmService) {}

  onSubmit(form: NgForm){
    let currentFilm = form.value;
    let lengthFilmIndex = Math.floor((Math.random() * 1000000) + 1);
    currentFilm.id = lengthFilmIndex;
    if(this.film) {
      this.filmService.updateFilm(this.film);
      this.film = undefined;
    } else {
      this.filmService.addFilm(currentFilm);
      form.reset();
    }
  }

  ngOnInit() {}

}
