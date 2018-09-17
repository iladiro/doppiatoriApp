import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[enpals-certification-list-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class EnpalsCertificationRowComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
