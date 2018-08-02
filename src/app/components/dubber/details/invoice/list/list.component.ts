import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Invoice } from '../_models/index';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'invoicesesList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  @Input() dubber: any;
  @Output() event = new EventEmitter();

  private current_invoice;

  private modal_message = {
    "text": "Sei sicuro di voler cancellarlo?"
  };

  p: number = 1;

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_invoice);
    }
  }

  constructor(
    private service: Service
  ) { }

  private delete(invoice) {
    let index = this.dubber.invoices.indexOf(invoice);
    this.service.delete("invoices", "id", invoice.id).subscribe(
      data => {
        if(index > -1) {
          this.dubber.invoices.splice(index, 1);
        }
        this.event.emit("delete");
      },
      err => {
        this.event.emit("rejected");
      }
    )
  }

  ngOnInit() {}

}
