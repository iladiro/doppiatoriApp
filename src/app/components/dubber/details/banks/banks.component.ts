import { Component, OnInit, Input } from '@angular/core';

// Services
import { BankService } from '../../_services/bank.service';

@Component({
  selector: 'banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class DubberBanksComponent implements OnInit {

  @Input() dubber: any;
  private bank: any = {};

  constructor(private bankService: BankService) { }

  create() {
    this.bank.dubber_id = this.dubber.id;
    this.bankService.create(this.bank).subscribe(
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
    this.bankService.delete(bank.id).subscribe(
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

  setAsDefault(bank) {
    let set = {
      "default_bank": true
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


  resetAllAsDefault(bank) {
    let reset = {
      "default_bank": false
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

  resetBankArrayValue(bank_id) {
    this.dubber.banks.map(function(bank) {
      if(bank.id == bank_id) {
        bank.default_bank = true
      } else {
        bank.default_bank = false
      }
    })
  }


  ngOnInit() {
    console.log(this.dubber.banks)
  }

}
