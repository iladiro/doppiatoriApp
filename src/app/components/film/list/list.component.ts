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
  private message = {
    "alert": {
      "text": "",
      "class": ""
    },
    "modal": {
      "text": "",
      "response": ""
    }
  };
  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  delete(film) {
    let index = this.films.indexOf(film);
    this.filmService.delete(film.id).subscribe(
      data => {
        this.films.splice(index, 1);
        this.message.alert.text = "It has been deleted successfully!";
        this.message.alert.class = "success";
      }
    );
  }

  private dataset(items) {
    this.films = items;
  }

  private setConfirm(data) {
    //this.message.modal.response = data;
    if(data == "true") {
      this.delete(this.currentFilm);
    }
  }

  private passCurrentFilm(film) {
    this.message.modal.text = "Are you sure you want to delete it?";
    this.currentFilm = film;
  }

  ngOnInit() {}

}
