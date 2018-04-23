import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Qualification } from '../_models/index';

// Services
import { QualificationService } from '../_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class QualificationDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  qualification: any = {};

  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private route: ActivatedRoute,
    private qualifService: QualificationService
  ) { }

  private upDate() {
    this.qualifService.update(this.qualification).subscribe(
      data => {
        this.alert_message = {
          "text": "La stringa è stata modificata con successo!",
          "class": "success",
          "display": true
        }
      },
      err => {
        this.alert_message = {
          "text": "Abbiamo riscontrato un errore!",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.qualifService.getById(this.id).subscribe(
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
