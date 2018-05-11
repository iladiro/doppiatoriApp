import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';

// Models
import { Dubber } from '../_models/index';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class DubberArchivedComponent implements OnInit {

  private modal_message = {
    "text": ""
  };
  private alert_message;

  private current_dubber;
  dubbers: Dubber[] = [];
  private type_request:string = "";

  constructor(
    private service: Service
  ) {}

  private passCurrentDubber(dubber, type_request) {
    if(type_request == "rollback") {
      this.type_request = type_request;
      this.modal_message.text = "Sei sicura di volerlo ripristinare?";
    } else if (type_request == "delete") {
      this.type_request = type_request;
      this.modal_message.text = "Sei sicura di volerlo definitivamente cancellare?";
    }
    this.current_dubber = dubber;
  }

  private setConfirm(data) {
    if(data == "true") {
      if(this.type_request == "rollback") {
        this.rollback(this.current_dubber);
      } else if(this.type_request == "delete") {
        this.delete(this.current_dubber);
      }
    }
  }

  private rollback(dubber) {
    let index = this.dubbers.indexOf(dubber);
    let archived = {
      "archived": false
    };
    this.service.archived("dubbers", dubber.id, archived).subscribe(
      data => {
        this.dubbers.splice(index, 1);
        this.alert_message = "rollback";
      },
      err => {
        console.log(err)
      }
    );
  }

  private delete(dubber) {
    let index = this.dubbers.indexOf(dubber);
    this.service.delete("dubbers", "id", dubber.id).subscribe(
      data => {
        this.dubbers.splice(index, 1);
        this.alert_message = "delete";
      },
      err => {
        console.log(err)
      }
    );
  }

  loadAllItems(table, variable) {
    this.service.getAll(table, "archived").subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers");
  }

}
