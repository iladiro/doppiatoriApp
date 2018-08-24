import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class ContractArchivedComponent implements OnInit {

  private contracts: any[] = [];
  private current_contract;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  p: number = 1;

  constructor(
    private service: Service
  ) {}

  private getData(data){
    this.current_contract = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      if(this.current_contract.request_type == "rollback") {
        this.rollback(this.current_contract.item);
      } else if(this.current_contract.request_type == "delete") {
        this.delete(this.current_contract.item);
      }
    }
  }

  private rollback(contract) {
    let index = this.contracts.indexOf(contract);
    let archived = {
      "archived": false
    };
    this.service.archived("contracts", contract.id, archived).subscribe(
      data => {
        this.contracts.splice(index, 1);
        this.alert_message = "rollback";
      },
      err => {
        console.log(err)
      }
    );
  }

  private delete(contract) {
    let index = this.contracts.indexOf(contract);
    this.service.delete("contracts", "id", contract.id).subscribe(
      data => {
        this.contracts.splice(index, 1);
        this.alert_message = "delete";
      },
      err => {
        console.log(err)
      }
    );
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("contracts", "contracts", "archived");
  }

}
