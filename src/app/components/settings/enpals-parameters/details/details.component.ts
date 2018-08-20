import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { EnpalParameter } from '../_models/index';

// Services
import { Service } from '../../../../services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class EnpalsParameterDetailsComponent implements OnInit {

  id: number;
  enpals_parameter: any = {};
  private alert_message;

  constructor(
    private service: Service,
    private route: ActivatedRoute
  ) {}

  private update() {
    this.service.update("enpals_parameters", this.enpals_parameter).subscribe(
      data => {
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.service.getById("enpals_parameters", "id", this.id).subscribe(
        data => {
          this.enpals_parameter = data;
        }
      );
    });
  }

}
