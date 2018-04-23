import { Component, OnInit } from '@angular/core';

// Models
import { Qualification } from '../_models/index';

// Services
import { QualificationService } from '../_services/index';

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

  constructor(private qualifService: QualificationService) { }

  create() {
    console.log(this.qualification);
    this.qualifService.create(this.qualification).subscribe(
      data => {
        console.log("ok");
        this.alert_message = {
          "text": "Creazione andata a buon fine!",
          "class": "success",
          "display": true
        }
      },
      err => {
        console.log("ko");
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
