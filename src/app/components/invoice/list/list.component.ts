import { Component, OnInit, Input } from '@angular/core';

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
  private message = {
    "text": "",
    "class": ""
  };

  constructor(
    private dubberService: DubberService,
    private invoiceService: InvoiceService
  ) { }

  private delete(currentInvoice) {
    let currentDubber = this.dataset;
    currentDubber.invoices.map(function(invoice, index){
      if(invoice.id == currentInvoice.id) {
        currentDubber.invoices.splice(index, 1);
      }
    });
    this.dubberService.update(currentDubber).subscribe(
      data => {
        this.message.text = "Invoice has been deleted successfully!";
        this.message.class = "success";
      },
      err => {
        this.message.text = "Error occured!";
        this.message.class = "danger";
      }
    );
    this.invoiceService.delete(currentInvoice.id).subscribe();
  }

  ngOnInit() {
  }

}
