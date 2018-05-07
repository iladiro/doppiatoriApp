import { Component, OnInit } from '@angular/core';

// Models
import { Qualification } from '../_models/index';

// Services
import { Service } from '../../../../services/index';

@Component({
  //selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class QualificationCreateComponent implements OnInit {

  qualification: any = {};

  private alert_message;

  constructor(
    private service: Service
  ) { }

  create() {
    this.service.create("qualifications", this.qualification).subscribe(
      data => {
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {
  }

}
