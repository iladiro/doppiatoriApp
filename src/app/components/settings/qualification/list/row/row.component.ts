import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[setting-qualification-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class SettingQualificationRowComponent implements OnInit {

  @Input() qualification;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor() { }

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit("Sei sicuro di volerlo archiviare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    } else if(request_type == "rollback") {
      this.msg.emit("Sei sicuro di volerlo ripristinare?");
    }
    this.data.emit({item: this.qualification, request_type: request_type})
  }

  ngOnInit() {
  }

}
