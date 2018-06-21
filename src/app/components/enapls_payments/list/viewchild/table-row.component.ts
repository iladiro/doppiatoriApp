import { Component, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: '[row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowEnpalsPaymentsComponent {
  @Input() current_data;
  @Output() msg =  new EventEmitter();
  @Output() set_data = new EventEmitter();
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
    this.service.update("enpals_payments", this.current_data).subscribe(
      data => {
        this.msg.emit("success");
      }
    );
  }

  private delete(item) {
    this.set_data.emit(item)
  }
}
