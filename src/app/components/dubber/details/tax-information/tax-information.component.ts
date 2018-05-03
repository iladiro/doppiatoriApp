import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tax-information',
  templateUrl: './tax-information.component.html',
  styleUrls: ['./tax-information.component.scss']
})
export class DubberTaxInformationComponent implements OnInit {

  @Input() dubber: any;

  constructor() { }

  ngOnInit() {
    console.log(this.dubber.addresses)
  }

}
