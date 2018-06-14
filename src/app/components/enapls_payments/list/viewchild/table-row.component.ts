import { Component, Input } from '@angular/core';

@Component({
  selector: 'row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowEnpalsPaymentsComponent {

  @Input() data;

  _readonly:boolean = true;

  private editable() {
    this._readonly = false;
  }

  private readonly() {
    this._readonly = true;
  }
}
