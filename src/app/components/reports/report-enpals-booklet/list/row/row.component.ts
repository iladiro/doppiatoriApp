import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[enpals-booklet-list-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class EnpalsBookletRowComponent implements OnInit {

  @Input() data;
  @Input() year;

  constructor() { }

  ngOnInit() {
  }

}
