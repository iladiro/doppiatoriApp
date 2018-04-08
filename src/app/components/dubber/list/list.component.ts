import { Component, OnInit } from '@angular/core';

// Services
import { DubberService } from '../_services/index';
import { FilmService } from '../../film/_services/index';

// Models
import { Dubber } from '../_models/index';
import { Film } from '../../film/_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class DubbersListComponent implements OnInit {

  private currentDubber;
  private DBTable:string = "dubbers";

  dataForRequestSearchComp = {
    "table": "dubbers",
    "parameter": "name"
  };

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  dubbers: Dubber[] = [];
  films: Film[] = [];

  constructor(
    private dubberService: DubberService,
    private filmService: FilmService
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
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.currentDubber = dubber;
  }
  // end

  // Viene chiamato all'apertura del modal, esattamente quando interagisci con esso, il quale restituisce un valore "true" o "false"
  private setConfirm(data) {
    // Se "true" viene chiamata la funzione delete
    if(data == "true") {
      this.delete(this.currentDubber);
    }
  }

  delete(dubber) {
    let index = this.dubbers.indexOf(dubber);
    let filmDubbersID = [];
    // for(let film of this.films) {
    //   for(let dubber of film.dubbers) {
    //     filmDubbersID.push(dubber.id);
    //   }
    // };
    if(filmDubbersID.includes(dubber.id)) {
      this.alertMessage = {
        "text": "You can't delete it, because this dubber is using!",
        "class": "danger",
        "display": true
      }
    } else {
      this.dubberService.delete(dubber.id).subscribe(
        data => {
          this.dubbers.splice(index, 1);
          this.alertMessage = {
            "text": "It has been deleted successfully!",
            "class": "success",
            "display": true
          }
        }
      );
    }
  }
  // end

  ngOnInit() {
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
  }

}
