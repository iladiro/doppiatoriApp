import { Component, OnInit, Input } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class DubberBanksComponent implements OnInit {

  @Input() dubber: any;
  private bank: any = {};

  constructor(
    private service: Service
  ) { }

  create() {
    this.bank.dubber_id = this.dubber.id;
    this.service.create("banks", this.bank).subscribe(
      data => {
        this.dubber.banks.push(this.bank);
      },
      err => {
        console.log(err)
      }
    );
  }

  delete(bank) {
    let index = this.dubber.banks.indexOf(bank);
    this.service.delete("banks", "id", bank.id).subscribe(
      data => {
        this.dubber.banks.splice(index, 1);
      },
      err => {
        console.log(err)
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


  ngOnInit() {}

}
