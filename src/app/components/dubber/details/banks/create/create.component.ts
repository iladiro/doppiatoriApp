import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'bankForm',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class BankCreateComponent implements OnInit {

  @Input() dubber: any;
  @Output() event = new EventEmitter();
  private bank: any = {};

  constructor(
    private service: Service
  ) { }

  create() {
    this.bank.dubber_id = this.dubber.id;
    this.service.create("banks", this.bank).subscribe(
      data => {
        this.dubber.banks.push(this.bank);
        this.event.emit("success");
      },
      err => {
        this.event.emit("rejected");
      }
    );
  }

  ngOnInit() {}

}
