import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';

@Component({
  //selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class EnpalsPaymentsCreateComponent implements OnInit {

  enpalspayment: any = {};

  private alert_message;

  constructor(
    private service: Service
  ) {}

  create(){
    console.log(typeof this.enpalspayment.amount)
    this.service.create("enpals_payments", this.enpalspayment)
    .subscribe(
      data => {
        this.alert_message = "success";
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    )
  }

  ngOnInit() {
  }

}
