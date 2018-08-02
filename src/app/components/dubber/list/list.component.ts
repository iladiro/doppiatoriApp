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

  constructor(
    private service: Service
  ) {}

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

//private type_request:string = "";
//private DB_table:string = "dubbers";

// dataForRequestSearchComp = {
//   "table": "dubbers",
//   "parameters": ["name", "surname"]
// };

// Viene chiamata quando viene pushato il componente "paginator". che salva nell'ordine corretto la lista dei dubbers
// private dataset(items) {
//   this.dubbers = items;
// }
// end

// Per la ricerca: dopo aver eseguito la ricerca viene passato dal figlio al padre la lista dei risultati che vengono salvati in dubbers
// private setFoundValueFromSearch(value){
//   this.dubbers = value;
// }
// end

// Quando vuoi cancellare un elemento della lista chiami prima questa funzione, che salva i dati dell'oggetto da cancellare
// private passCurrentDubber(dubber, type_request) {
//   if(type_request == "archive") {
//     this.type_request = type_request;
//     this.modal_message.text = "Sei sicura di volerlo archiviare?";
//   } else if (type_request == "delete") {
//     this.type_request = type_request;
//     this.modal_message.text = "Sei sicura di volerlo definitivamente cancellare?";
//   }
//   this.current_dubber = dubber;
// }
// end
