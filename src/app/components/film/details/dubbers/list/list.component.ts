import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'film-dubbers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilmDubbersListComponent implements OnInit {

  @Input() dubbers: any;

  constructor(
    private service: Service,
  ) { }

  ngOnInit() {
  }

}
