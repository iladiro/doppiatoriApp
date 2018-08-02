import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Services
import { Service } from '../../../../services/index';

@Component({
  selector: '[todocurrentdayrow]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class ToDoCurrentDayRowComponent implements OnInit {

  @Input() current_data;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor(
    private service: Service
  ) {}

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit("Sei sicuro di volerlo archiviare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    } else if(request_type == "rollback") {
      this.msg.emit("Sei sicuro di volerlo ripristinare?");
    }
    this.data.emit({item: this.current_data, request_type: request_type})
  }

  ngOnInit() {}

}
