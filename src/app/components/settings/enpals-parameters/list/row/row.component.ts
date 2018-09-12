import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[setting-enpals-par-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class SettingEnpalsParamRowComponent implements OnInit {

  @Input() enpals_param;

  constructor() { }

  ngOnInit() {
  }

}
