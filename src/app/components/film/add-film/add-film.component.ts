import { Component, OnInit, Input } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';
import { DubberService } from '../../dubber/dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})

export class AddFilmComponent implements OnInit {

  private currentFilm;
  private status:boolean = false;

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  onSubmit(form: NgForm){
    this.currentFilm = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    this.currentFilm.id = lengthDubbersIndex;
    //this.filmService.getAll();
    this.filmService.create(this.currentFilm);
    form.reset();
    this.status = true;
  }

  ngOnInit() {
    this.dubberService.getAll();
  }

}
