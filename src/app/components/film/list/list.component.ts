import { Component, OnInit } from '@angular/core';
import { Film } from '../_models/index';
import { FilmService } from '../_services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class FilmListComponent implements OnInit {

  private currentFilm;
  private DBTable:string = "film";

  dataForRequestSearchComp = {
    "table": "film",
    "parameter": "title"
  };

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  delete(film) {
    let index = this.films.indexOf(film);
    this.filmService.delete(film.id).subscribe(
      data => {
        this.films.splice(index, 1);
        this.alertMessage = {
          "text": "It has been deleted successfully!",
          "class": "success",
          "display": true
        }
      }
    );
  }

  private dataset(items) {
    this.films = items;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.currentFilm);
    }
  }

  private passCurrentFilm(film) {
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.currentFilm = film;
  }

  private setFoundValueFromSearch(value){
    this.films = value;
  }

  ngOnInit() {}

}
