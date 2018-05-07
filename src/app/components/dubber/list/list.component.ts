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
  private DB_table:string = "dubbers";

  dataForRequestSearchComp = {
    "table": "dubbers",
    "parameters": ["name", "surname"]
  };

  private modal_message = {
    "text": ""
  };
  private alert_message;

  dubbers: Dubber[] = [];
  private status:string = "";

  constructor(
    private service: Service
  ) {}

  // Viene chiamata quando viene pushato il componente "paginator". che salva nell'ordine corretto la lista dei dubbers
  private dataset(items) {
    this.dubbers = items;
  }
  // end

  // Per la ricerca: dopo aver eseguito la ricerca viene passato dal figlio al padre la lista dei risultati che vengono salvati in dubbers
  private setFoundValueFromSearch(value){
    this.dubbers = value;
  }
  // end

  // Quando vuoi cancellare un elemento della lista chiami prima questa funzione, che salva i dati dell'oggetto da cancellare
  private passCurrentDubber(dubber) {
    this.modal_message.text = "Sei sicura di volerlo cancellare?";
    this.current_dubber = dubber;
  }
  // end

  // Viene chiamato all'apertura del modal, esattamente quando interagisci con esso, il quale restituisce un valore "true" o "false"
  private setConfirm(data) {
    // Se "true" viene chiamata la funzione delete
    if(data == "true") {
      this.deleteInRelationTable(this.current_dubber);
    }
  }

  private deleteInRelationTable(dubber) {
    let index = this.dubbers.indexOf(dubber);
    let dubber_id = dubber.id;
    this.service.delete("dubbers_films", "dubber_id", dubber.id).subscribe(
      data => {
        this.dubbers.splice(index, 1);
        this.alert_message = "delete";
        this.status = "ok";
      },
      err => {
        this.status = "ko";
        this.alert_message = "rejected"
      },
      () => this.deleteDubber(dubber_id)
    )
  }

  private deleteDubber(dubber) {
    if(this.status == "ok") {
      this.service.delete("dubbers", "id", dubber).subscribe(
        data => {},
        err => {
          console.log(err)
        }
      );
    }
  }
  // end

  ngOnInit() {}

}
