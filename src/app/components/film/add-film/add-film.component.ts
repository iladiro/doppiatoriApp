import { Component, OnInit, Input } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';
import { DubberService } from '../../dubber/dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss'],
  providers: [FilmService, DubberService]
})

export class AddFilmComponent implements OnInit {

  //@Input() film;
  currentFilm;

  constructor(private filmService: FilmService, private dubberService: DubberService) {}

  onSubmit(form: NgForm){
    this.currentFilm = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    this.currentFilm.id = lengthDubbersIndex;
    this.filmService.getFilms();
    this.filmService.addFilm(this.currentFilm);
    form.reset();
    // if(this.film) {
    //   this.filmService.updateFilm(this.film);
    //   this.film = undefined;
    // } else {
    //   this.filmService.addFilm(this.currentFilm);
    //   form.reset();
    // }
  }

  ngOnInit() {
    this.dubberService.getDubbers();
    //this.filmService.getFilms();
  }

}
