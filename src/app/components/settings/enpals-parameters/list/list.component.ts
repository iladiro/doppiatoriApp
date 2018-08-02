import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

// Models
import { EnpalParameter } from '../_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnpalsParametersListComponent implements OnInit {

  private current_enpal_parameter;
  private enpals_parameters: any = [];

  private modal_message = {
    "text": ""
  };
  private alert_message;

  p: number = 1;

  constructor(
    private service: Service
  ) { }

  private getData(data){
    this.current_enpal_parameter = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_enpal_parameter.item);
    }
  }

  delete(enpal_parameter) {
    let index = this.enpals_parameters.indexOf(enpal_parameter);
    this.service.delete("enpals_parameters", "id", enpal_parameter.id).subscribe(
      data => {
        this.enpals_parameters.splice(index, 1);
        this.alert_message = "delete";
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
    this.loadAllItems("enpals_parameters", "enpals_parameters", "all");
  }

}

// private passCurrentItem(item) {
//   this.modal_message.text = "Sei sicuro di volerlo cancellare?";
//   this.current_enpal_parameter = item;
// }

// private setFoundValueFromSearch(value){
//   this.enpals_parameters = value;
// }

// private datasetFromPaginator(items) {
//   this.enpals_parameters = items;
// }

// DB_table:string = "enpals_parameters";
//
// dataForRequestSearchComp = {
//   "table": "enpals_parameters",
//   "parameters": ["name", "address"]
// };
