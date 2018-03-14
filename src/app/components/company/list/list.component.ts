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

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(private companyService: CompanyService) { }

  private dataset(items) {
    this.companies = items;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.currentCompany);
    }
  }

  private passCurrentCompany(company) {
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.currentCompany = company;
  }

  delete(company) {
    let index = this.companies.indexOf(company);
    this.companyService.delete(company.id).subscribe(
      data => {
        this.companies.splice(index, 1);
        this.alertMessage = {
          "text": "It has been deleted successfully!",
          "class": "success",
          "display": true
        }
      }
    );
  }

  ngOnInit() {}

}
