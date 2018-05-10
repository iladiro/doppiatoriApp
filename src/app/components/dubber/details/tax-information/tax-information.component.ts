import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'tax-information',
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss']
})
export class DubberTaxInformationComponent implements OnInit {

  @Input() dubber: any;
  address: any = {};

  constructor(
    private service: Service,
    private http: HttpClient
  ) {}

  update() {
    this.service.update("addresses", this.address).subscribe(
      data => {
        console.log("ok")
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnInit() {
    this.address = this.dubber.addresses[0];
  }

}
