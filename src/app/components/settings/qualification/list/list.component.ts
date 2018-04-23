import { Component, OnInit } from '@angular/core';

// Models
import { Qualification } from '../_models/index';

//Services
import { QualificationService } from '../_services/index';

@Component({
  // selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class QualificationListComponent implements OnInit {

  private current_qualif;

  private DB_table:string = "qualifications";

  qualifications: Qualification[] = [];

  private modal_message = {
    "text": ""
  };
  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  // Settare i dati da passare al componente ricerca per eseguire la ricerca sulla giusta tabella del DB e in base a quale parametro
  dataForRequestSearchComp = {
    "table": "qualifications",
    "parameters": ["code", "description"]
  };
  // end

  constructor(private qualifService: QualificationService) { }

  // Valori che ritornano dopo la ricerca
  private setFoundValueFromSearch(value){
    this.qualifications = value;
  }
  // end

  //----------------------------------------------------------------------------

  // Salva i dati passati dal componente paginator
  private datasetFromPaginator(items) {
    this.qualifications = items;
  }
  // end

  private passCurrentItem(qualification) {
    this.modal_message.text = "Sei sicuro di voler cancellare la riga?";
    this.current_qualif = qualification;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_qualif);
    }
  }

  private delete(qualification) {
    console.log(qualification);
    let index = this.qualifications.indexOf(qualification);
    this.qualifService.delete(qualification.id).subscribe(
      data => {
        console.log("ok");
        this.alert_message = {
          "text": "L'elemento è stato cancellato con successo come richiesto!",
          "class": "success",
          "display": true
        };
        this.qualifications.splice(index, 1);
      },
      err => {
        console.log("ko");
        this.alert_message = {
          "text": "Si è verificato un errore!",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  ngOnInit() {
  }

}
