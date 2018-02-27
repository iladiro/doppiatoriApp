import { Component } from '@angular/core';
import { FilmListComponent } from '../film-list/film-list.component';
import { Film } from '../_models/index';
import { FilmService } from '../_services/index';
import { DubberService } from '../../dubber/_services/dubbers.service';
import {NgForm} from '@angular/forms';

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

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  create(){
    let filmDubbersIdSelected = [];
    // let updateDubbers = [];
    //From an array of string, create dubber's object.
    this.model.dubbers = this.model.dubbers.map(function(item) {
      var data = item.split(',');
      //filmDubbersIdSelected.push(data[0]);
      return {
        "id": data[0],
        "name": data[1]
      };
    });
    //end
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
    /* Se l'id del dubber su cui stai ciclando è contenuto nell'array dei dubber selezionati
    nella proprietà film del dubber pusha l'oggeto film */
    // this.dubberService.dubbersList.map(function(dubber) {
    //   if(filmDubbersIdSelected.includes(dubber.id.toString())) {
    //     let dubberFilm = dubber.film;
    //     let obj = {
    //       "id": currentFilm.id,
    //       "title": currentFilm.title
    //     };
    //     dubberFilm.push(obj);
    //     updateDubbers.push(dubber);
    //   }
    // });
    // updateDubbers.forEach(function(dubber) {
    //   service.update(dubber);
    // });
    // this.filmService.create(currentFilm);
    // form.reset();
  }

  ngOnInit() {
    this.dubberService.getAll();
  }

}
