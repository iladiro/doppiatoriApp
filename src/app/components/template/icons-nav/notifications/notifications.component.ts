import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  todo_list: any = [];
  date = new Date();

  constructor(
    private service: Service
  ) {}

  ngOnInit() {
    let current_day = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.service.getByDate("todo", current_day, "equal").subscribe(
      data => {
        this.todo_list = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
