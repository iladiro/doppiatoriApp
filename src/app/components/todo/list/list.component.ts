import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ToDoListComponent implements OnInit {

  date = new Date();
  todo_list: any = [];
  private current_todo;

  private modal_message = {
    "text": ""
  };
  private alert_message;

  p: number = 1;

  constructor(
    private service: Service
  ) {}

  private getData(data){
    this.current_todo = data;
  }

  private getMessage(text) {
    this.modal_message.text = text;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.current_todo.item);
    }
  }

  delete(item) {
    let index = this.todo_list.indexOf(item);
    this.service.delete("todo", "id", item.id).subscribe(
      data => {
        this.todo_list.splice(index, 1);
        this.alert_message = "delete";
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  ngOnInit() {
    let current_date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.service.getByDate("todo", current_date , "gte").subscribe(
      data => {
        this.todo_list = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
