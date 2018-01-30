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

  create(form: NgForm){
    this.currentFilm = form.value;
    // To assign an ID param to the film object
    this.currentFilm.id = Math.floor((Math.random() * 1000000) + 1);
    // end
    // From an array of string, create dubber's object.
    this.currentFilm.dubbers = this.currentFilm.dubbers.map(function(item) {
      var data = item.split(',');
      return {
        "id": data[0],
        "name": data[1]
      };
    });
    // end
    let relationshipObject = {
      "idFilm": this.currentFilm.id
      "idDubbers": this.currentFilm.dubbers.map(function(dubber) {
        return dubber.id
      })
    };
    this.filmService.create(this.currentFilm);
    this.filmService.createRelationship(relationshipObject);
    form.reset();
    this.status = true;
  }

  ngOnInit() {
    this.dubberService.getAll();
  }

}
