import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[film-dubbers-list-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class FilmDubbersListRowComponent implements OnInit {

  @Input() dubber;

  constructor() { }

  ngOnInit() {
  }

}
