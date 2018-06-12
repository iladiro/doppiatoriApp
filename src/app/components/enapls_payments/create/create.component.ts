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

  create(form){
    console.log(form);
    this.service.create("enpals_payments", this.enpalspayment).subscribe(
      data => {
        this.alert_message = "success";
        if (form.valid) {
          console.log("Form Submitted!");
          form.reset();
        }
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    )
  }

  // reset() {
  //   this.heroes = HEROES.slice();
  // }

  ngOnInit() {
  }

}
