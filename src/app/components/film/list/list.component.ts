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

  private dataForRequestSearchComp = {
    "table": "films",
    "parameters": ["title"]
  };

  p: number = 1;

  public modal_message = {
    "text": ""
  };
  public alert_message;

  constructor(
    private service: Service
  ) {}

  private setFoundValueFromSearch(value){
    this.films = value;
  }

  private getData(data){
    this.current_film = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_film.item);
    }
  }

  private delete(film) {
    let index = this.films.indexOf(film);
    this.service.delete("films", "id", film.id).subscribe(
      data => {
        this.films.splice(index, 1);
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
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
