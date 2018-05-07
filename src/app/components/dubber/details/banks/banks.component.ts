import { Component, OnInit, Input } from '@angular/core';

// Services
import { Service } from '../../../../services/index';
import { BankService } from '../../_services/bank.service';

@Component({
  selector: 'banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class DubberBanksComponent implements OnInit {

  @Input() dubber: any;
  private bank: any = {};

  constructor(
    private service: Service,
    private bankService: BankService
  ) { }

  create() {
    this.bank.dubber_id = this.dubber.id;
    this.service.create("banks", this.bank).subscribe(
      data => {
        this.dubber.banks.push(this.bank);
        console.log("ok");
        //this.bank = {};
      },
      err => {
        console.log("ko")
      }
    );
  }

  delete(bank) {
    let index = this.dubber.banks.indexOf(bank);
    this.service.delete("banks", "id", bank.id).subscribe(
      data => {
        console.log("ok");
        this.dubber.banks.splice(index, 1);
      },
      err => {
        console.log("ko")
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
    this.bankService.resetDefault(bank.dubber_id, reset).subscribe(
      data => {
        console.log("ok");
      },
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
    this.bankService.setAsDefault(bank.id, set).subscribe(
      data => {
        console.log("ok");
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
