import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[collaborators-report-list-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class CollaboratorsReportRowComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
