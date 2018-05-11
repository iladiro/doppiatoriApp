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
  DB_table:string = "enpals_parameters";

  dataForRequestSearchComp = {
    "table": "enpals_parameters",
    "parameters": ["name", "address"]
  };

  private modal_message = {
    "text": ""
  };
  private alert_message;

  constructor(
    private service: Service
  ) { }

  private passCurrentItem(item) {
    this.modal_message.text = "Sei sicuro di volerlo cancellare?";
    this.current_enpal_parameter = item;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_enpal_parameter);
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

  // ---------------------------------------------------------------------------

  private setFoundValueFromSearch(value){
    this.enpals_parameters = value;
  }

  // private datasetFromPaginator(items) {
  //   this.enpals_parameters = items;
  // }

  // ---------------------------------------------------------------------------


  ngOnInit() {
    this.service.getAll("enpals_parameters", "all").subscribe(
      data => {
        this.enpals_parameters = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
