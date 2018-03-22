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

  @Input() dataset: any;
  @Output() event = new EventEmitter();

  constructor(
    private dubberService: DubberService,
    private invoiceService: InvoiceService
  ) { }

  private delete(current_invoice, event) {
    let current_dubber = this.dataset;
    current_dubber.invoices.map(function(invoice, index){
      if(invoice.id == current_invoice.id) {
        current_dubber.invoices.splice(index, 1);
      }
    });
    this.dubberService.update(current_dubber).subscribe(
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
    this.invoiceService.delete(current_invoice.id).subscribe();
  }

  ngOnInit() {
  }

}
