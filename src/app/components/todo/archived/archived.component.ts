import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.scss']
})
export class ToDoArchivedComponent implements OnInit {

  todo_list: any = [];
  private current_todo;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  private request_type:string = "";

  constructor(
    private service: Service
  ) {}

  private passCurrentRecord(item, request_type) {
    if(request_type == "rollback") {
      this.request_type = request_type;
      this.modal_message.text = "Sei sicura di volerlo ripristinare?";
    } else if (request_type == "delete") {
      this.request_type = request_type;
      this.modal_message.text = "Sei sicura di volerlo definitivamente cancellare?";
    }
    this.current_todo = item;
  }

  private setConfirm(data) {
    if(data == "true") {
      if(this.request_type == "rollback") {
        this.rollback(this.current_todo);
      } else if(this.request_type == "delete") {
        this.delete(this.current_todo);
      }
    }
  }

  private rollback(item) {
    let index = this.todo_list.indexOf(item);
    let archived = {
      "archived": false
    };
    this.service.archived("todo", item.id, archived).subscribe(
      data => {
        this.todo_list.splice(index, 1);
        this.alert_message = "rollback";
      },
      err => {
        console.log(err)
      }
    );
  }

  private delete(item) {
    let index = this.todo_list.indexOf(item);
    this.service.delete("todo", "id", item.id).subscribe(
      data => {
        this.todo_list.splice(index, 1);
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
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("todo", "todo_list", "archived");
  }

}
