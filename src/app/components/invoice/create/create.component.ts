import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';

// Services
import { InvoiceService } from '../_services/index';
import { DubberService } from '../../dubber/_services/index';

@Component({
  selector: 'formInvoice',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {

  @Input() private dataset: any;
  private message = {
    "text": "",
    "class": ""
  };

  constructor(
    private dubberService: DubberService,
    private invoiceService: InvoiceService
  ) { }

  compensationCalculation(gross, percentual) {
    let difference = (gross * percentual) / 100;
    let resultNet = gross - difference;
    return [difference, resultNet]
  }

  private create(form: NgForm) {
    // Genera fattura, pusha l'oggetto fattura dentro alla proprietà invoices e poi aggiorna il modello
    let date = new Date();
    let currentInvoice = form.value;
    let result = this.compensationCalculation(currentInvoice.grossCompensation, currentInvoice.taxPercetual);
    currentInvoice = {
      "id": Math.floor((Math.random() * 1000000) + 1),
      "creationDate": date.toLocaleDateString(),
      "movie": currentInvoice.movie,
      "compensation": {
        "gross": +currentInvoice.grossCompensation,
        "taxPercetual": +currentInvoice.taxPercetual,
        "taxEuro": result[0],
        "net": result[1]
      }
    };
    this.dataset.invoices.push(currentInvoice);
    //this.upDateDubber();
    this.dubberService.update(this.dataset).subscribe(
      data => {
        this.message.text = "It has been updated successfully!";
        this.message.class = "success";
      },
      err => {
        this.message.text = "Error occured!";
        this.message.class = "danger";
      }
    );
    //  end

    // Aggiungi all'oggetto fattura i dati del dubber e poi crea una nuova fattura nella tabbella invoices
    currentInvoice.dubber = {
      "id": this.dataset.id,
      "name": this.dataset.name,
      "surname": this.dataset.surname,
      "email": this.dataset.email,
      "fiscalCode": this.dataset.fiscalCode,
      "birthdate": this.dataset.birthdate,
      "birthplace": this.dataset.birthplace,
      "residenceplace": this.dataset.residenceplace,
      "residenceaddress": this.dataset.residenceaddress
    }
    this.invoiceService.create(currentInvoice).subscribe();
    // end

    form.reset();
  }

  ngOnInit() {}

}
