import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[film-list-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class FilmListRowComponent implements OnInit {

  @Input() film;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor() { }

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit("Sei sicuro di volerlo archiviare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    }
    this.data.emit({item: this.film, request_type: request_type})
  }

  ngOnInit() {
  }

}
