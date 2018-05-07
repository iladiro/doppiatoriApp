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

  alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private service: Service
  ) { }

  create() {
    console.log(this.qualification);
    this.service.create("qualifications", this.qualification).subscribe(
      data => {
        this.alert_message = {
          "text": "Creazione andata a buon fine!",
          "class": "success",
          "display": true
        }
      },
      err => {
        this.alert_message = {
          "text": "Errore",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  ngOnInit() {
  }

}
