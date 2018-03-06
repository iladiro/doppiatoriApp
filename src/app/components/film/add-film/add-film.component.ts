import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
//import { FilmListComponent } from '../film-list/film-list.component';

import { Film } from '../_models/index';
import { Dubber } from '../../dubber/_models/index';

import { FilmService } from '../_services/index';
import { DubberService } from '../../dubber/_services/dubbers.service';

@Component({
  moduleId: module.id,
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.scss']
})

export class AddFilmComponent {

  model: any = {};
  loading = false;
  private message = {
    "text": "",
    "class": ""
  };
  filmDubbersIdSelected = [];
  dubbers: Dubber[] = [];

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  create(){
    let arrayOfDubbers = this.filmDubbersIdSelected;
    //From an array of string, create dubber's object.
    this.model.dubbers = this.model.dubbers.map(function(item) {
      var data = item.split(',');
      arrayOfDubbers.push(data[0]);
      return {
        "id": data[0],
        "name": data[1]
      };
    });
    //end
    //Send object film to server
    this.filmService.create(this.model).subscribe(
      data => {
        this.message.text = "Film has been created successfully!";
        this.message.class = "success";
      },
      err => {
        this.message.text = "Error occured!";
        this.message.class = "danger";
      }
    );
    //end

    this.addFilmIntoDubberSelected();

    // form.reset();
  }

  //Aggiungi film ai dubbers selezionati
  addFilmIntoDubberSelected() {
    let arrayOfDubbers = this.filmDubbersIdSelected;

    let currentFilm = this.model;
    let service = this.dubberService;
    let updateDubbers = [];

    this.dubberService.dubbersList.map(function(dubber) {
      if(arrayOfDubbers.includes(dubber.id.toString())) {
        let dubberFilms = dubber.film;
        let filmObj = {
          "id": currentFilm.id,
          "title": currentFilm.title
        };
        dubberFilms.push(filmObj);
        updateDubbers.push(dubber);
      }
    });
    updateDubbers.forEach(function(dubber) {
      service.update(dubber);
    });
  }
  //end

  ngOnInit() {
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

}
