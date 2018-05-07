import { Component } from '@angular/core';
import { Response } from "@angular/http";

// Models
import { Film } from '../_models/index';
import { Dubber } from '../../dubber/_models/index';

// Services
import { Service } from '../../../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class AddFilmComponent {

  film: any = {};
  id: number;
  dubbers: any = [];
  // dubbers: Dubber[] = [];
  status: string = "";

  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private service: Service
  ) {}

  create(){
    let filmObj = Object.assign({}, this.film);
    delete filmObj.dubbers;
    //Send object film to server
    this.service.create("films", filmObj)
      // resp is of type `HttpResponse<Config>`
    .subscribe(
      resp => {
        let str = resp.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.id = Number(result[0]);
        this.alert_message = {
          "text": "L'operazione è andata a buon fine!",
          "class": "success",
          "display": true
        }
        this.status = "ok";
      },
      err => {
        this.status = "ko";
        this.alert_message = {
          "text": "Si è verificato un errore!",
          "class": "danger",
          "display": true
        }
      },
      () => this.addFilmDubbersInRelationTable()
    )
  }

  private addFilmDubbersInRelationTable() {
    let film_id = this.id;
    let dubbers_selected = this.film.dubbers;
    let film_dubbers = [];

    if(this.status == "ok") {
      dubbers_selected.map(function(dubber) {
        let object_pair = {
          "film_id": film_id,
          "dubber_id": dubber
        };
        film_dubbers.push(object_pair);
      });
      this.service.create("dubbers_films", film_dubbers).subscribe(
        data => {
          console.log("ok")
        },
        err => {
          console.log("ko")
        }
      );
    }
  }

  ngOnInit() {
    this.service.getAll("dubbers").subscribe(
      data => { this.dubbers = data; }
    );
  }

}
