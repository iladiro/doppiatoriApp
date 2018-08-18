import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'banksList',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BanksListComponent implements OnInit {

  @Input() dubber: any;
  @Output() msg = new EventEmitter();
  @Output() current_bank = new EventEmitter();

  constructor(
    private service: Service
  ) { }

  private getData(data){
    this.current_bank.emit(data);
    if(data.request_type == 'set_default') {
      this.asDefault(data.item)
    }
  }

  private getMessage(data) {
    if(data.type == "modal") {
      this.msg.emit({message: data.message, type: 'modal'});
    } else if(data.type == "alert") {
      this.msg.emit({message: data.message, type: 'alert'});
    }
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
        this.resetBankArrayValue(bank.id);
      },
      err => {
        console.log(err)
      }
    )
  }

  resetBankArrayValue(bank_id) {
    this.dubber.banks.map(function(bank) {
      if(bank.id == bank_id) {
        bank._default = true
      } else {
        bank._default = false
      }
    })
  }

  ngOnInit() {}

}
