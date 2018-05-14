import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Company } from '../_models/index';

// Services
import { Service } from '../../../../services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  company: any = {};

  private alert_message;

  constructor(
    private service: Service,
    private route: ActivatedRoute
  ) {}

  private update() {
    this.service.update("companies", this.company).subscribe(
      data => {
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.service.getById("companies", "id", this.id).subscribe(
        data => {
          this.company = data;
        }
      );
    });
  }

}
