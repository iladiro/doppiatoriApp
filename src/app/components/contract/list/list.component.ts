import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';
import { ContractService } from '../_services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ContractListComponent implements OnInit {

  private contracts: any[] = [];
  private current_contract;

  public modal_message = {
    "text": ""
  };
  public alert_message;

  p: number = 1;

  private dataForRequestSearchComp = {
    "table": "contracts",
    "parameters": ["dubber_fullname", "film_title"],
    "conditions": "not_archived"
  };

  constructor(
    private service: Service,
    private own_service: ContractService
  ) { }

  private setFoundValueFromSearch(value){
    this.contracts = value;
  }

  private getData(data): void{
    this.current_contract = data;
  }

  private getMessage(text): void {
    this.modal_message.text = text;
  }

  private setConfirm(data): void {
    if(data == "true") {
      if(this.current_contract.request_type == "archive") {
        this.archive(this.current_contract.item);
      } else if(this.current_contract.request_type == "delete") {
        this.delete(this.current_contract.item);
      }
    }
  }

  private archive(contract): void {
    let index = this.contracts.indexOf(contract);
    let archived = {
      "archived": true
    };
    this.service.archived("contracts", contract.id, archived).subscribe(
      data => {
        this.contracts.splice(index, 1);
        this.alert_message = "archive";
      },
      err => {
        console.log(err)
      }
    );
  }

  private delete(contract): void {
    let index = this.contracts.indexOf(contract);
    this.service.delete("contracts", "id", contract.id).subscribe(
      data => {
        this.contracts.splice(index, 1);
        this.alert_message = "success";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  loadAllItems(table, variable, condition): void {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("contracts", "contracts", "not_archived");
  }

}
