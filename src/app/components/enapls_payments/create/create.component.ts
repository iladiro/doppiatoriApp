import { Component, OnInit } from '@angular/core';

// Models
import { EnpalsPayments } from '../_models/index';

// Services
import { Service } from '../../../services/index';

// Helpers
import { PrintYears } from '../../../helpers/print-years';
import { PrintMonths } from '../../../helpers/print-months';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class EnpalsPaymentsCreateComponent implements OnInit {

  private alert_message;

  months: any = [];
  years: any = [];

  constructor(
    private service: Service,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) {}

  create(form){
    this.service.create("enpals_payments", form.value).subscribe(
      data => {
        this.alert_message = "success";
        form.reset();
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    )
  }

  ngOnInit() {
    this.years = this.print_years.generate("2004");
    this.months = this.print_months.generate();
  }

}
