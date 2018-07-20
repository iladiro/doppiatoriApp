import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {differenceInCalendarDays} from 'date-fns'

//Services
import { Service } from '../../../../services/index';

@Component({
  selector: '[todoexpirerow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class ToDoExpireRowComponent implements OnInit {

  @Input() current_data;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();
  private missing_days;

  constructor(
    private service: Service
  ) {}

  private passDataToParent(item, request_type) {
    this.msg.emit("Sei sicuro di volerlo cancellare?");
    this.data.emit({item: item, request_type: request_type})
  }

  ngOnInit() {}

}
