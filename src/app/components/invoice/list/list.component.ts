import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { DubberService } from '../../dubber/_services/index';
import { InvoiceService } from '../_services/index';

@Component({
  selector: 'invoiceList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  @Input() private dataset: any;
  @Output() event = new EventEmitter();

  constructor(
    private dubberService: DubberService,
    private invoiceService: InvoiceService
  ) { }

  private delete(currentInvoice, event) {
    let currentDubber = this.dataset;
    currentDubber.invoices.map(function(invoice, index){
      if(invoice.id == currentInvoice.id) {
        currentDubber.invoices.splice(index, 1);
      }
    });
    this.dubberService.update(currentDubber).subscribe(
      data => {
        this.event.emit({
          "text": "It has been canceled successfully",
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
    this.invoiceService.delete(currentInvoice.id).subscribe();
  }

  ngOnInit() {
  }

}
