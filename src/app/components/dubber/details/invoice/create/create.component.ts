import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';

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
        this.dubber.invoices.push(current_invoice);
        this.event.emit({
          "text": "Generato con successo!",
          "class": "success",
          "display": true
        });
      },
      err => {
        this.event.emit({
          "text": "Errore",
          "class": "danger",
          "display": true
        });
      }
    );

    form.reset();
  }

  ngOnInit() {
    this.service.getAll("companies").subscribe(
      data => {
        this.companies = data;
      }
    );
  }

}
