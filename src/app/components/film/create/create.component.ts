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
  status: string = "";

  private alert_message;

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
        this.alert_message = "success";
        this.status = "ok";
      },
      err => {
        this.status = "ko";
        this.alert_message = "rejected";
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
        data => {},
        err => {
          console.log(err)
        }
      );
    }
  }

  loadAllItems(table, variable) {
    this.service.getAll(table, "not_archived").subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers");
  }

}
