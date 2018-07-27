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

  private films: Film[] = [];
  private current_film;

  public modal_message = {
    "text": ""
  };
  public alert_message;

  constructor(
    private service: Service
  ) {}

  private getData(data){
    this.current_film = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_film);
    }
  }

  private delete(film) {
    let index = this.films.indexOf(film);
    this.service.delete("films", "id", film.item.id).subscribe(
      data => {
        this.films.splice(index, 1);
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
        console.log(err);
      }
    );
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("films", "films", "all");
  }

}


//private DB_table:string = "films";
//private status:string = "";

// Settare i dati da passare al componente ricerca per eseguire la ricerca sulla giusta tabella del DB e in base a quale parametro
// dataForRequestSearchComp = {
//   "table": "films",
//   "parameters": ["title", "description"]
// };
// end

// Salva i dati passati dal componente paginator
// private datasetFromPaginator(items) {
//   this.films = items;
// }
// end

// private delete(film) {
//   let index = this.films.indexOf(film);
//   let film_id = film.id;
//   this.service.delete("dubbers_films", "film_id", film.id).subscribe(
//     data => {
//       this.films.splice(index, 1);
//       this.alert_message = "success";
//       this.status = "ok";
//     },
//     err => {
//       this.status = "ko";
//       this.alert_message = "rejected";
//     },
//     () => this.deleteFilm(film_id)
//   )
// }

// private setFoundValueFromSearch(value){
//   this.films = value;
// }
