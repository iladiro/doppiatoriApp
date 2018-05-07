import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

// Models
import { Company } from '../_models/index';

// Services
import { Service } from '../../../../services/index';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  company: any = {};
  loading = false;

  private alert_message;

  constructor(
    private service: Service
  ) { }

  create() {
    //this.company.id = Math.floor((Math.random() * 1000000) + 1);
    this.service.create("companies", this.company).subscribe(
      data => {
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {}

}
