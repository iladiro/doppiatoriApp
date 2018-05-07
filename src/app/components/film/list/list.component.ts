import { Component, OnInit } from '@angular/core';

// Models
import { Film } from '../_models/index';

//Services
import { Service } from '../../../services/index';

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
  private alert_message;

  constructor(
    private service: Service
  ) {}

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
    this.service.delete("dubbers_films", "film_id", film.id).subscribe(
      data => {
        this.films.splice(index, 1);
        this.alert_message = "success";
        this.status = "ok";
      },
      err => {
        this.status = "ko";
        this.alert_message = "rejected";
      },
      () => this.deleteFilm(film_id)
    )
  }

  private deleteFilm(film) {
    if(this.status == "ok") {
      this.service.delete("films", "id", film).subscribe(
        data => {},
        err => {
          console.log(err)
        }
      );
    }
  }

  private setFoundValueFromSearch(value){
    this.films = value;
  }

  ngOnInit() {}

}
