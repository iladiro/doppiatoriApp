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

  private getMessage(text) {
    this.msg.emit({text: text, type: 'modal'});
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


  // delete(bank) {
  //   let index = this.dubber.banks.indexOf(bank.item);
  //   this.service.delete("banks", "id", bank.item.id).subscribe(
  //     data => {
  //       if(index > -1) {
  //         this.dubber.banks.splice(index, 1);
  //       }
  //       this.msg.emit("delete");
  //     },
  //     err => {
  //       this.msg.emit("rejected");
  //     }
  //   )
  // }

  ngOnInit() {}

}
