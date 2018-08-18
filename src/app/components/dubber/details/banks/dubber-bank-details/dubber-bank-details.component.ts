import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'app-dubber-bank-details',
  templateUrl: './dubber-bank-details.component.html',
  styleUrls: ['./dubber-bank-details.component.scss']
})
export class DubberBankDetailsComponent implements OnInit {

  @Input() bank: any;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor(
    private service: Service
  ) { }

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit({ message: "Sei sicuro di volerlo archiviare?", type: "modal"});
    } else if(request_type == "delete") {
      this.msg.emit({ message: "Sei sicuro di volerlo cancellare?", type: "modal"});
    } else if(request_type == "rollback") {
      this.msg.emit({ message: "Sei sicuro di volerlo ripristinare?", type: "modal"});
    }
    this.data.emit({
      item: this.bank,
      request_type: request_type,
      table: "banks",
      property: "banks"
    })
  }

  update() {
    this.service.update("banks", this.bank).subscribe(
      data => {
        this.msg.emit({ message: "success", type: "alert"});
      },
      err => {
        console.log(err);
        this.msg.emit({ message: "rejected", type: "alert"});
      }
    );
  }

  ngOnInit() {}

}
