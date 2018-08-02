import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {differenceInCalendarDays} from 'date-fns';

@Component({
  selector: '[todorow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class ToDoListRowComponent implements OnInit {

  @Input() current_data;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();
  private missing_days;

  constructor() {}

  private missingDays() {
    let event_date = new Date(this.current_data.date);
    let current_date = new Date();
    this.missing_days = differenceInCalendarDays(
      new Date(event_date),
      new Date(current_date)
    );
  }

  private passDataToParent(item, request_type) {
    if(request_type == "archive") {
      this.msg.emit("Sei sicuro di volerlo archiviare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    } else if(request_type == "rollback") {
      this.msg.emit("Sei sicuro di volerlo ripristinare?");
    }
    item.missing_days = this.missing_days;
    this.data.emit({item: item, request_type: request_type})
  }

  ngOnInit() {
    this.missingDays()
  }

}
