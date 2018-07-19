import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ToDoListComponent implements OnInit {

  private current_todo;

  todo_list: any = [];
  private request_type:string = "";
  private modal_message = {
    "text": ""
  };
  private alert_message;

  constructor(
    private service: Service
  ) {}

  // Quando vuoi cancellare un elemento della lista chiami prima questa funzione, che salva i dati dell'oggetto da cancellare
  private passCurrentRecord(item, request_type) {
    if(request_type == "archive") {
      this.request_type = request_type;
      this.modal_message.text = "Sei sicura di volerlo archiviare?";
    } else if (request_type == "delete") {
      this.request_type = request_type;
      this.modal_message.text = "Sei sicura di volerlo definitivamente cancellare?";
    }
    this.current_todo = item;
  }
  // end

  // Viene chiamato all'apertura del modal, esattamente quando interagisci con esso, il quale restituisce un valore "true" o "false"
  private setConfirm(data) {
    if(data == "true") {
      if(this.request_type == "archive") {
        this.archive(this.current_todo);
      } else if(this.request_type == "delete") {
        this.delete(this.current_todo);
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
  // end

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
