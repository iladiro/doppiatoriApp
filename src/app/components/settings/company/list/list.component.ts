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

  private companies: Company[] = [];
  private current_company;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  constructor(
    private service: Service
  ) { }

  private getData(data){
    this.current_company = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_company.item);
    }
  }

  private delete(company) {
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

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("companies", "companies", "all");
  }

}

// private DB_table:string = "companies";
// dataForRequestSearchComp = {
//   "table": "companies",
//   "parameters": ["name", "address"]
// };
// private setFoundValueFromSearch(value){
//   this.companies = value;
// }
//
// private datasetFromPaginator(items) {
//   this.companies = items;
// }
//
// private passCurrentCompany(company) {
//   this.modal_message.text = "Sei sicuro di volerlo cancellare?";
//   this.current_company = company;
// }
//
// private setConfirm(data) {
//   if(data == "true") {
//     this.delete(this.current_company);
//   }
// }
