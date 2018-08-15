import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Qualification } from '../_models/index';

// Services
import { Service } from '../../../../services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class QualificationDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  qualification: any = {};

  private alert_message;

  constructor(
    private service: Service,
    private route: ActivatedRoute
  ) { }

  private upDate() {
    this.service.update("qualifications", this.qualification).subscribe(
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
      this.service.getById("qualifications", "id", this.id).subscribe(
        data => {
          this.qualification = data;
        },
        err => {
          console.log(err)
        }
      );
    });
  }

}
