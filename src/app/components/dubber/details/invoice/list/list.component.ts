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

  @Input() invoices: any;
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

  ngOnInit() {}

}
