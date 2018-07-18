import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ToDoCreateComponent implements OnInit {

  constructor(
    private service: Service
  ) {}

  private alert_message;

  create(form){
    this.service.create("todo", form.value).subscribe(
      data => {
        this.alert_message = "success";
        form.reset();
      },
      err => {
        this.alert_message = "rejected";
      }
    )
  }

  ngOnInit() {
  }

}
