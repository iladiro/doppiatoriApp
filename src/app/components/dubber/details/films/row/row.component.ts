import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[dubber-film-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class DubberFilmRowComponent implements OnInit {

  @Input() collaboration;
  // @Output() msg =  new EventEmitter();
  // @Output() data = new EventEmitter();

  constructor() { }

  // private passDataToParent(request_type) {
  //   if(request_type == "archive") {
  //     this.msg.emit({ message: "Sei sicuro di volerlo archiviare?", type: "modal"});
  //   } else if(request_type == "delete") {
  //     this.msg.emit({ message: "Sei sicuro di volerlo cancellare?", type: "modal"});
  //   } else if(request_type == "rollback") {
  //     this.msg.emit({ message: "Sei sicuro di volerlo ripristinare?", type: "modal"});
  //   }
  //   this.data.emit({
  //     item: this.collaboration,
  //     request_type: request_type,
  //     table: "films",
  //     property: "films"
  //   })
  // }

  ngOnInit() {
    console.log(this.collaboration)
  }

}
