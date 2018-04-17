import { Component, OnInit } from '@angular/core';

// Services
import { CompanyService } from '../_services/index';

// Models
import { Company } from '../_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CompanyListComponent implements OnInit {

  private currentCompany;
  companies: Company[] = [];
  private DBTable:string = "companies";

  dataForRequestSearchComp = {
    "table": "companies",
    "parameters": ["name", "vat", "address"]
  };

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(private companyService: CompanyService) { }

  private setFoundValueFromSearch(value){
    this.companies = value;
  }

  private datasetFromPaginator(items) {
    this.companies = items;
  }

  private passCurrentCompany(company) {
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.currentCompany = company;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.currentCompany);
    }
  }

  delete(company) {
    console.log(company.id);
    let index = this.companies.indexOf(company);
    this.companyService.delete(company.id).subscribe(
      data => {
        this.companies.splice(index, 1);
        this.alertMessage = {
          "text": "It has been deleted successfully!",
          "class": "success",
          "display": true
        };
      },
      err => {
        this.alertMessage = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        };
      }
    );
  }

  ngOnInit() {}

}
