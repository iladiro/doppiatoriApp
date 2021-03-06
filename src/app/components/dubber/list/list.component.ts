import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';

// Models
import { Dubber } from '../_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class DubbersListComponent implements OnInit {

  private current_dubber;
  dubbers: Dubber[] = [];

  private modal_message = {
    "text": ""
  };
  private alert_message;

  private dataForRequestSearchComp = {
    "table": "dubbers",
    "parameters": ["name", "surname", "email"]
  };

  p: number = 1;

  constructor(
    private service: Service
  ) {}

  private setFoundValueFromSearch(value){
    this.dubbers = value;
  }

  private getData(data){
    this.current_dubber = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  // Viene chiamato all'apertura del modal, esattamente quando interagisci con esso, il quale restituisce un valore "true" o "false"
  private setConfirm(data) {
    if(data == "true") {
      if(this.current_dubber.request_type == "archive") {
        this.archive(this.current_dubber.item);
      } else if(this.current_dubber.request_type == "delete") {
        this.delete(this.current_dubber.item);
      }
    }
  }

  private archive(dubber) {
    let index = this.dubbers.indexOf(dubber);
    let archived = {
      "archived": true
    };
    this.service.archived("dubbers", dubber.id, archived).subscribe(
      data => {
        this.dubbers.splice(index, 1);
        this.alert_message = "archive";
      },
      err => {
        console.log(err)
      }
    );
  }

  private delete(dubber) {
    let index = this.dubbers.indexOf(dubber);
    this.service.delete("dubbers", "id", dubber.id).subscribe(
      data => {
        this.dubbers.splice(index, 1);
        this.alert_message = "delete";
      },
      err => {
        console.log(err)
      }
    );
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers", "not_archived");
  }

}
