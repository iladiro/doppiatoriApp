import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { AddressService } from '../../_services/address.service';

@Component({
  selector: 'tax-information',
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss']
})
export class DubberTaxInformationComponent implements OnInit {

  @Input() dubber: any;
  address: any = {};

  constructor(
    private addressService: AddressService,
    private http: HttpClient
  ) {}

  update() {
    this.addressService.update(this.address).subscribe(
      data => {
        console.log("ok")
      },
      err => {
        console.log("ko")
      }
    )
  }

  ngOnInit() {
    this.address = this.dubber.addresses[0];
  }

}
