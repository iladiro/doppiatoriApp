import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Response } from "@angular/http";

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'formInvoice',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class InvoiceCreateComponent implements OnInit {

  @Input() dubber: any;
  @Output() event = new EventEmitter();
  id: number;
  companies: any = [];

  constructor(
    private service: Service
  ) { }

  private compensationCalculation(gross, percentual) {
    let difference = (gross * percentual) / 100;
    let result_net = gross - difference;
    return [difference, result_net]
  }

  private create(form: NgForm, event) {
    let date = new Date();
    let current_invoice = form.value;

    let result = this.compensationCalculation(current_invoice.gross, current_invoice.tax_percetual);

    current_invoice.creation_date = date.toLocaleDateString();
    current_invoice.gross = +current_invoice.gross;
    current_invoice.net = +result[1];
    current_invoice.tax_percetual = +current_invoice.tax_percetual;
    current_invoice.tax_euro = +result[0];
    current_invoice.dubber_id = +this.dubber.id;
    current_invoice.company_id = +current_invoice.company_id;

    this.service.create("invoices", current_invoice).subscribe(
      data => {
        let str = data.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.id = Number(result[0]);
        this.reloadList();
        this.event.emit("success");
      },
      err => {
        this.event.emit("rejected");
      }
    );

    form.reset();
  }

  private reloadList() {
    this.service.getManyById("invoices", "dubber_id", this.dubber.id).subscribe(
      data => {
        this.dubber.invoices = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  ngOnInit() {
    //console.log(this.dubber);
    this.service.getAll("companies").subscribe(
      data => {
        this.companies = data;
      }
    );
  }

}
