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
      this.msg.emit("Sei sicuro di volerlo archiviare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    } else if(request_type == "rollback") {
      this.msg.emit("Sei sicuro di volerlo ripristinare?");
    }
    this.data.emit({item: this.bank, request_type: request_type})
  }

  //called from button into view
  asDefault(bank) {
    this.resetAllAsDefault(bank)
  }

  resetAllAsDefault(bank) {
    let reset = {
      "_default": false
    }
    this.service.resetDefault("banks", bank.dubber_id, reset).subscribe(
      data => {},
      err => {
        console.log(err)
      },
      () => this.setAsDefault(bank)
    )
  }

  setAsDefault(bank) {
    let set = {
      "_default": true
    }
    this.service.setAsDefault("banks", bank.id, set).subscribe(
      data => {
        //this.resetBankArrayValue(bank.id);
      },
      err => {
        console.log(err)
      }
    )
  }

  // resetBankArrayValue(bank_id) {
  //   this.dubber.banks.map(function(bank) {
  //     if(bank.id == bank_id) {
  //       bank._default = true
  //     } else {
  //       bank._default = false
  //     }
  //   })
  // }

  ngOnInit() {}

}
