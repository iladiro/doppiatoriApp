import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[dubber-invoice-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class DubberInvoiceRowComponent implements OnInit {

  @Input() dubber_id;
  @Input() invoice;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor() { }

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit({ message: "Sei sicuro di volerlo archiviare?", type: "modal"});
    } else if(request_type == "delete") {
      this.msg.emit({ message: "Sei sicuro di volerlo cancellare?", type: "modal"});
    } else if(request_type == "rollback") {
      this.msg.emit({ message: "Sei sicuro di volerlo ripristinare?", type: "modal"});
    }
    this.data.emit({
      item: this.invoice,
      request_type: request_type,
      table: "invoices",
      property: "invoices"
    })
  }

  ngOnInit() {
    console.log(this.invoice)
  }

}
