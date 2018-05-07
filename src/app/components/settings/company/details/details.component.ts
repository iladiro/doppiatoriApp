import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Company } from '../_models/index';

// Services
import { Service } from '../../../../services/index';
import { CompanyService } from '../_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  company: any = {};
  loading = false;

  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  private upDate() {
    this.loading = true;
    this.service.update("companies", this.company).subscribe(
      data => {
        this.alert_message = {
          "text": "Aggiornato con successo!",
          "class": "success",
          "display": true
        }
        this.loading = false;
      },
      err => {
        this.alert_message = {
          "text": "Si è verificato un errore!",
          "class": "danger",
          "display": true
        }
        this.loading = false;
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.companyService.getById(this.id).subscribe(
        data => {
          this.company = data;
        }
      );
    });
  }

}
