import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'bankForm',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class BankCreateComponent implements OnInit {

  @Input() banks: any;
  @Output() msg = new EventEmitter();

  constructor(
    private service: Service
  ) { }

  create(form) {
    form.value.dubber_id = this.banks[0].dubber_id;
    this.service.create("banks", form.value).subscribe(
      data => {
        let str = data.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        form.value.id = Number(result[0]);
        this.banks.push(form.value);
        this.msg.emit({message: "success", type: 'alert'});
        form.reset();
      },
      err => {
        console.log(err);
        this.msg.emit({message: "rejected", type: 'alert'});
      }
    );
  }

  ngOnInit() {}

}
