import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Company } from '../_models/index';

// Services
import { CompanyService } from '../_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  model: any = {};
  loading = false;

  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  private upDate() {
    this.loading = true;
    this.companyService.update(this.model).subscribe(
      data => {
        this.alertMessage = {
          "text": "Company has been updated successfully!",
          "class": "success",
          "display": true
        }
        this.loading = false;
      },
      err => {
        this.alertMessage = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
        this.loading = false;
      }
    );
  }

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.companyService.getById(this.id).subscribe(
        data => {
          this.model = data;
        }
      );
    });
  }

}
