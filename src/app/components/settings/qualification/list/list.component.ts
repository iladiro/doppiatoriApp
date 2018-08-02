import { Component, OnInit } from '@angular/core';

// Models
import { Qualification } from '../_models/index';

//Services
import { Service } from '../../../../services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class QualificationListComponent implements OnInit {

  private qualifications: Qualification[] = [];
  private current_qualif;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  p: number = 1;

  constructor(
    private service: Service
  ) { }

  private getData(data){
    this.current_qualif = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_qualif.item);
    }
  }

  private delete(qualification) {
    let index = this.qualifications.indexOf(qualification);
    this.service.delete("qualifications", "id", qualification.id).subscribe(
      data => {
        this.alert_message = "delete";
        this.qualifications.splice(index, 1);
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
    this.loadAllItems("qualifications", "qualifications", "all");
  }

}

//private DB_table:string = "qualifications";
// Settare i dati da passare al componente ricerca per eseguire la ricerca sulla giusta tabella del DB e in base a quale parametro
// dataForRequestSearchComp = {
//   "table": "qualifications",
//   "parameters": ["code", "description"]
// };
// end

// Valori che ritornano dopo la ricerca
// private setFoundValueFromSearch(value){
//   this.qualifications = value;
// }
// end
// Salva i dati passati dal componente paginator
// private datasetFromPaginator(items) {
//   this.qualifications = items;
// }
// end
//
// private passCurrentItem(qualification) {
//   this.modal_message.text = "Sei sicuro di voler cancellare la riga?";
//   this.current_qualif = qualification;
// }
