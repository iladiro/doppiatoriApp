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

  create(form) {
    form.value.dubber_id = this.dubber.id;
    this.service.create("banks", form.value).subscribe(
      data => {
        let str = data.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        form.value.id = Number(result[0]);
        this.dubber.banks.push(form.value);
        this.event.emit("success");
      },
      err => {
        this.event.emit("rejected");
      }
    );
  }

  ngOnInit() {}

}
