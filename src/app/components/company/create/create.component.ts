import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

// Models
import { Company } from '../_models/index';

// Services
import { CompanyService } from '../_services/index';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  company: any = {};
  loading = false;

  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  create() {
    this.company.id = Math.floor((Math.random() * 1000000) + 1);
    this.companyService.create(this.company).subscribe(
      data => {
        this.alertMessage = {
          "text": "Company has been created successfully!",
          "class": "success",
          "display": true
        }
      },
      err => {
        this.alertMessage = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  constructor(private companyService: CompanyService) { }

  ngOnInit() {}

}
