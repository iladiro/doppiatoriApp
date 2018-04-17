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
  private DB_table:string = "films";

  films: Film[] = [];

  private status:string = "";

  // Settare i dati da passare al componente ricerca per eseguire la ricerca sulla giusta tabella del DB e in base a quale parametro
  dataForRequestSearchComp = {
    "table": "films",
    "parameters": ["title", "description"]
  };
  // end

  private modal_message = {
    "text": ""
  };
  private alert_message = {
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
    this.modal_message.text = "Sei sicuro? La cancellazione del film comporta la rimozione di tutti i riferimenti a questo dato";
    this.current_film = film;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.deleteInRelationTable(this.current_film);
    }
  }

  private deleteInRelationTable(film) {
    let index = this.films.indexOf(film);
    let film_id = film.id;
    this.filmService.deleteFilmFromReationTable(film.id).subscribe(
      data => {
        this.films.splice(index, 1);
        this.alert_message = {
          "text": "It has been deleted successfully!",
          "class": "success",
          "display": true
        };
        this.status = "ok";
      },
      err => {
        this.status = "ko";
        this.alert_message = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
      },
      () => this.deleteFilm(film_id)
    )
  }

  private deleteFilm(film) {
    if(this.status == "ok") {
      this.filmService.delete(film).subscribe(
        data => {
          console.log("ok")
        },
        err => {
          console.log("ko")
        }
      );
    }
  }

  private setFoundValueFromSearch(value){
    this.films = value;
  }

  ngOnInit() {}

}
