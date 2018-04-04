import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';

// Services
import { InvoiceService } from '../_services/index';
import { DubberService } from '../../dubber/_services/index';
import { CompanyService } from '../../company/_services/index';

@Component({
  selector: 'formInvoice',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  @Input() private dataset: any;
  @Output() event = new EventEmitter();

  companies: any[] = [];

  constructor(
    private dubberService: DubberService,
    private invoiceService: InvoiceService,
    private companyService: CompanyService
  ) { }

  private compensationCalculation(gross, percentual) {
    let difference = (gross * percentual) / 100;
    let result_net = gross - difference;
    return [difference, result_net]
  }

  private create(form: NgForm, event) {
    // Genera fattura, pusha l'oggetto fattura dentro alla proprietà invoices e poi aggiorna il modello
    let date = new Date();
    let current_invoice = form.value;
    current_invoice.company = current_invoice.company.split(';');

    let result = this.compensationCalculation(current_invoice.gross_compensation, current_invoice.tax_percetual);
    current_invoice = {
      "id": Math.floor((Math.random() * 1000000) + 1),
      "creation_date": date.toLocaleDateString(),
      "movie": current_invoice.movie,
      "compensation": {
        "gross": +current_invoice.grossCompensation,
        "tax_percetual": +current_invoice.taxPercetual,
        "tax_euro": result[0],
        "net": result[1]
      },
      "company": {
        "id":  current_invoice.company[0],
        "name": current_invoice.company[1],
        "address": current_invoice.company[2],
        "vat": current_invoice.company[3]
      }
    };
    this.dataset.invoices.push(current_invoice);
    //this.upDateDubber();
    this.dubberService.update(this.dataset).subscribe(
      data => {
        this.event.emit({
          "text": "It has been created successfully!",
          "class": "success",
          "display": true
        });
      },
      err => {
        this.event.emit({
          "text": "Error",
          "class": "danger",
          "display": true
        });
      }
    );
    //  end

    // Aggiungi all'oggetto fattura i dati del dubber e poi crea una nuova fattura nella tabella invoices
    current_invoice.dubber = {
      "id": this.dataset.id,
      "name": this.dataset.name,
      "surname": this.dataset.surname,
      "gender": this.dataset.gender,
      "email": this.dataset.email,
      "fiscal_code": this.dataset.fiscal_code,
      "birth_date": this.dataset.birth_date,
      "birth_place": this.dataset.birth_place,
      "residence_place": this.dataset.residence_place,
      "residence_address": this.dataset.residence_address
    }
    this.invoiceService.create(current_invoice).subscribe();
    // end

    form.reset();
  }

  ngOnInit() {
    this.companyService.getAll().subscribe(
      data => { this.companies = data; }
    );
  }

}
