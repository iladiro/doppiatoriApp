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

  //private currentFilm;
  private status:boolean = false;

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  create(form: NgForm){
    let service = this.dubberService;
    let filmDubbersIdSelected = [];
    let currentFilm = form.value;
    // To assign an ID param to the film object
    currentFilm.id = Math.floor((Math.random() * 1000000) + 1);
    // end
    let updateDubbers = [];
    // From an array of string, create dubber's object.
    currentFilm.dubbers = currentFilm.dubbers.map(function(item) {
      var data = item.split(',');
      filmDubbersIdSelected.push(data[0]);
      return {
        "id": data[0],
        "name": data[1]
      };
    });
    // end
    this.dubberService.dubbersList.map(function(dubber) {
      if(filmDubbersIdSelected.includes(dubber.id.toString())) {
        let dubberFilm = dubber.film;
        let obj = {
          "id": currentFilm.id,
          "title": currentFilm.title
        };
        dubberFilm.push(obj);
        updateDubbers.push(dubber);
      }
    });
    updateDubbers.forEach(function(dubber) {
      service.update(dubber);
    });
    this.filmService.create(currentFilm);
    form.reset();
    this.status = true;
  }

  ngOnInit() {
    this.dubberService.getAll();
  }

}
