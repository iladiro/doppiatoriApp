import { Component, OnInit } from '@angular/core';

// Models
import { Film } from '../_models/index';

//Services
import { FilmService } from '../_services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class FilmListComponent implements OnInit {

  private current_film;
  private DBTable:string = "films";

  films: Film[] = [];

  // Settare i dati da passare al componente ricerca per eseguire la ricerca sulla giusta tabella del DB e in base a quale parametro
  dataForRequestSearchComp = {
    "table": "films",
    "parameter": "title"
  };
  // end

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(private filmService: FilmService) {}

  // Salva i dati passati dal componente paginator
  private datasetFromPaginator(items) {
    this.films = items;
  }
  // end

  private passCurrentFilm(film) {
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.current_film = film;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_film);
    }
  }

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
      },
      err => {
        this.alertMessage = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  private setFoundValueFromSearch(value){
    this.films = value;
  }

  ngOnInit() {}

}
