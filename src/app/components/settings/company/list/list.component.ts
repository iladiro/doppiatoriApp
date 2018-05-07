import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

// Models
import { Company } from '../_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CompanyListComponent implements OnInit {

  private current_company;
  companies: Company[] = [];
  private DB_table:string = "companies";

  dataForRequestSearchComp = {
    "table": "companies",
    "parameters": ["name", "address"]
  };

  private modal_message = {
    "text": ""
  };
  private alert_message;

  constructor(
    private service: Service
  ) { }

  private setFoundValueFromSearch(value){
    this.companies = value;
  }

  private datasetFromPaginator(items) {
    this.companies = items;
  }

  private passCurrentCompany(company) {
    this.modal_message.text = "Sei sicuro di volerlo cancellare?";
    this.current_company = company;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_company);
    }
  }

  delete(company) {
    console.log(company.id);
    let index = this.companies.indexOf(company);
    this.service.delete("companies", "id", company.id).subscribe(
      data => {
        this.companies.splice(index, 1);
        this.alert_message = "delete";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {}

}
