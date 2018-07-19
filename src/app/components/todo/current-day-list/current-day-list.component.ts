import { Component, OnInit } from '@angular/core';

//Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-current-day-list',
  templateUrl: './current-day-list.component.html',
  styleUrls: ['./current-day-list.component.scss']
})
export class CurrentDayListComponent implements OnInit {

  todo_list: any = [];
  date = new Date();

  constructor(
    private service: Service
  ) {}

  ngOnInit() {
    let current_day = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate();
    this.service.getByDate("todo", current_day, "not_archived").subscribe(
      data => {
        this.todo_list = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
