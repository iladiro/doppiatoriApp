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

  private alert_message;

  constructor(
    private service: Service
  ) { }

  create(form) {
    this.service.create("qualifications", form.value).subscribe(
      data => {
        this.alert_message = "success";
        form.reset();
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {
  }

}
