import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Services
import { HomeAddressService } from '../../_services/home-address.service';
import { ResidenceAddressService } from '../../_services/residence-address.service';

@Component({
  selector: 'tax-information',
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss']
})
export class DubberTaxInformationComponent implements OnInit {

  @Input() dubber: any;

  constructor(
    private homeAddressService: HomeAddressService,
    private residenceAddressService: ResidenceAddressService,
    private http: HttpClient
  ) { }

  update(data: NgForm) {
    this.homeAddressService.update(data).subscribe(
      data => {
        console.log("ok")
      },
      err => {
        console.log("ko")
      }
    )
  }

  delete(id) {
    this.homeAddressService.delete(id).subscribe()
  }

  //called from button into view
  asDefault(address: NgForm) {
    console.log(address);
    this.resetAllAsDefault(address)
  }

  resetAllAsDefault(address) {
    let reset = {
      "_default": false
    }
    this.homeAddressService.resetDefault(address.dubber_id, reset).subscribe(
      data => {
        console.log("ok");
      },
      err => {
        console.log(err)
      },
      () => this.setAsDefault(address)
    )
  }

  setAsDefault(address) {
    let set = {
      "_default": true
    }
    this.homeAddressService.setAsDefault(address.id, set).subscribe(
      data => {
        console.log("ok");
        this.resetAddressesArrayValue(address.id);
      },
      err => {
        console.log(err)
      }
    )
  }

  resetAddressesArrayValue(address_id) {
    this.dubber.home_addresses.map(function(address) {
      if(address.id == address_id) {
        address._default = true
      } else {
        address._default = false
      }
    })
  }

  ngOnInit() {
    console.log(this.dubber.residence_addresses)
  }

}
