import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[archived-dubber-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class ArchivedDubberRowComponent implements OnInit {

  @Input() dubber;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor() { }

  private passDataToParent(request_type) {
    if(request_type == "rollback") {
      this.msg.emit("Sei sicuro di volerlo ripristinare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    }
    this.data.emit({item: this.dubber, request_type: request_type})
  }

  ngOnInit() {
  }

}
