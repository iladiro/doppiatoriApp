import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RetributionBandsListComponent implements OnInit {

  private retribution_bands: any = [];

  private alert_message;
  // private modal_message = {
  //   "text": ""
  // };

  constructor(
    private service: Service
  ) { }

  private getMessage(data) {
    if(data.type == "modal") {
      //this.modal_message.text = data.message;
    } else if(data.type == "alert") {
      this.alert_message = data.message;
    }
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
    this.loadAllItems("income_classes", "retribution_bands", "all");
  }

}
