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
  @Output() msg =  new EventEmitter();
  @Output() current_invoice = new EventEmitter();

  p: number = 1;

  constructor(
    private service: Service
  ) { }

  private getData(data){
    this.current_invoice.emit(data);
  }

  private getMessage(data) {
    if(data.type == "modal") {
      this.msg.emit({message: data.message, type: 'modal'});
    } else if(data.type == "alert") {
      this.msg.emit({message: data.message, type: 'alert'});
    }
  }

  // private current_invoice;
  //
  // private modal_message = {
  //   "text": "Sei sicuro di voler cancellarlo?"
  // };
  //
  // private setConfirm(data) {
  //   if(data == "true") {
  //     this.delete(this.current_invoice);
  //   }
  // }
  //
  //
  //
  // private delete(invoice) {
  //   let index = this.dubber.invoices.indexOf(invoice);
  //   this.service.delete("invoices", "id", invoice.id).subscribe(
  //     data => {
  //       if(index > -1) {
  //         this.dubber.invoices.splice(index, 1);
  //       }
  //       this.event.emit("delete");
  //     },
  //     err => {
  //       this.event.emit("rejected");
  //     }
  //   )
  // }

  ngOnInit() {}

}
