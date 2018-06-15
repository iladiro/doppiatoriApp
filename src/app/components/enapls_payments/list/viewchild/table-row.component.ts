import { Component, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowEnpalsPaymentsComponent {

  @Input() data;
  @Output() set_data = new EventEmitter();
  @Output() set_msg =  new EventEmitter();
  _readonly:boolean = true;

  constructor(
    private service: Service
  ) {}

  private editable() {
    this._readonly = false;
  }

  private readonly() {
    this._readonly = true;
    this.update();
  }

  private update() {
    this.service.update("enpals_payments", this.data).subscribe(
      data => {
        this.set_msg.emit("success");
        console.log("ok");
      }
    );
  }

  private setData(item) {
    this.set_data.emit(item)
  }
}
