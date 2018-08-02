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

  dubbers: Dubber[] = [];
  private current_dubber;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  p: number = 1;

  constructor(
    private service: Service
  ) {}

  private getData(data){
    this.current_dubber = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      if(this.current_dubber.request_type == "rollback") {
        this.rollback(this.current_dubber.item);
      } else if(this.current_dubber.request_type == "delete") {
        this.delete(this.current_dubber.item);
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

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers", "archived");
  }

}
