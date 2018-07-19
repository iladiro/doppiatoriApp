import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ToDoListComponent implements OnInit {

  todo_list: any = [];
  private current_todo;

  private modal_message = {
    "text": "Sei sicuro di voler cancellarlo?"
  };
  private alert_message;

  constructor(
    private service: Service
  ) {}

  private getData(data){
    console.log(data);
    this.current_todo = data;
  }

  private setConfirm(data) {
    if(data == "true") {
      if(this.current_todo.request_type == "archive") {
        this.archive(this.current_todo.item);
      } else if(this.current_todo.request_type == "delete") {
        this.delete(this.current_todo.item);
      }
    }
  }

  private archive(item) {
    let index = this.todo_list.indexOf(item);
    let archived = {
      "archived": true
    };
    this.service.archived("todo", item.id, archived).subscribe(
      data => {
        this.todo_list.splice(index, 1);
        this.alert_message = "archive";
      },
      err => {
        console.log(err)
      }
    );
  }

  delete(item) {
    let index = this.todo_list.indexOf(item);
    this.service.delete("todo", "id", item.id).subscribe(
      data => {
        if(index > -1) {
          this.todo_list.splice(index, 1);
        }
        this.alert_message = "success";
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
    this.loadAllItems("todo", "todo_list", "not_archived");
  }

}
