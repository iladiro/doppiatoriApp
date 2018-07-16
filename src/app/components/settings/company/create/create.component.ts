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

  private alert_message;

  constructor(
    private service: Service
  ) { }

  create(form) {
    this.service.create("companies", form.value).subscribe(
      data => {
        this.alert_message = "success";
        form.reset();
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {}

}
