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
  @Output() event = new EventEmitter();

  private current_bank;

  private modal_message = {
    "text": "Sei sicuro di voler cancellarlo?"
  };

  constructor(
    private service: Service
  ) { }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_bank);
    }
  }

  delete(bank) {
    let index = this.dubber.banks.indexOf(bank);
    this.service.delete("banks", "id", bank.id).subscribe(
      data => {
        if(index > -1) {
          this.dubber.banks.splice(index, 1);
        }
        this.event.emit("delete");
      },
      err => {
        this.event.emit("rejected");
      }
    )
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


  ngOnInit() {
    //console.log(this.dubber)
  }

}
