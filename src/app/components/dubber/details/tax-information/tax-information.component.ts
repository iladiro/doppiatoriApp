import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'tax-information',
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss']
})
export class DubberTaxInformationComponent implements OnInit {

  @Input() addresses: any;
  @Output() msg = new EventEmitter();

  constructor(
    private service: Service
  ) {}

  update() {
    this.service.update("addresses", this.addresses[0]).subscribe(
      data => {
        this.msg.emit({ message: "success", type: "alert"});
      },
      err => {
        this.msg.emit({ message: "rejected", type: "alert"});
      }
    )
  }

  ngOnInit() {}

}
