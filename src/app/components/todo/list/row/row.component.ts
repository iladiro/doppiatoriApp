import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {differenceInCalendarDays} from 'date-fns'

//Services
import { Service } from '../../../../services/index';

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

  constructor(
    private service: Service
  ) {}

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
    } else {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    }
    this.data.emit({item: item, request_type: request_type})
  }

  ngOnInit() {
    this.missingDays()
  }

}
