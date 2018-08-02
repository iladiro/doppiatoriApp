import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';

// Helpers
//import { LoadAllItems } from '../../../helpers/load-all-items';

@Component({
  //selector: 'app-list',
  //providers: [LoadAllItems],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnpalsPaymentsListComponent implements OnInit {

  enpals_payments: any = [];
  private current_enpals_payment;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  constructor(
    private service: Service
    //private loadAllItems: LoadAllItems
  ) {}

  private getData(data){
    this.current_enpals_payment = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_enpals_payment.item);
    }
  }

  private delete(item) {
    let index = this.enpals_payments.indexOf(item);
    this.service.delete("enpals_payments", "id", item.id).subscribe(
      data => {
        this.enpals_payments.splice(index, 1);
        this.alert_message = "success";
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
    this.loadAllItems("enpals_payments", "enpals_payments", "all");
    //this.enpals_payments = this.loadAllItems.get("enpals_payments", "all");
  }

}
