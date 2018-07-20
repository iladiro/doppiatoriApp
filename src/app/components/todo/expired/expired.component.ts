import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.scss']
})
export class ToDoExpiredComponent implements OnInit {

  date = new Date();

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

  ngOnInit() {
    let current_date = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.service.getByDate("todo", current_date , "lt").subscribe(
      data => {
        this.todo_list = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
