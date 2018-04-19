import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Invoice } from '../_models/index';

// Services
import { DubberService } from '../../dubber/_services/index';
import { InvoiceService } from '../_services/index';

@Component({
  selector: 'invoiceList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  @Input() dubber: any;
  @Output() event = new EventEmitter();

  constructor(
    private dubberService: DubberService,
    private invoiceService: InvoiceService
  ) { }

  private delete(current_invoice, event) {
    let invoices_list = this.dubber.invoices;
    this.invoiceService.delete(current_invoice.id).subscribe(
      data => {
        invoices_list.map(function(invoice, index){
          if(invoice.id == current_invoice.id) {
            invoices_list.splice(index, 1);
          }
        });
        this.event.emit({
          "text": "Cancellato con successo!",
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
    )
  }

  ngOnInit() {
    console.log(this.dubber)
  }

}
