import { Component, OnInit } from '@angular/core';

// Services
import { DubberService } from '../_services/index';

// Models
import { Dubber } from '../_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class DubbersListComponent implements OnInit {

  private current_dubber;
  private DBTable:string = "dubbers";

  data_for_request_search_comp = {
    "table": "dubbers",
    "parameter": "name"
  };

  private modal_message = {
    "text": ""
  };
  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  dubbers: Dubber[] = [];
  private status:string = "";

  constructor(
    private dubberService: DubberService
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
    this.dubberService.deleteDubberFromReationTable(dubber.id).subscribe(
      data => {
        this.dubbers.splice(index, 1);
        this.alert_message = {
          "text": "Cancellato con successo!",
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
      () => this.deleteDubber(dubber_id)
    )
  }

  private deleteDubber(dubber) {
    if(this.status == "ok") {
      this.dubberService.delete(dubber).subscribe(
        data => {
          console.log("ok")
        },
        err => {
          console.log("ko")
        }
      );
    }
  }
  // end

  ngOnInit() {}

}
