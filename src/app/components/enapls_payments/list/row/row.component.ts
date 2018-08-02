import { Component, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: '[enpals-payments-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class EnpalsPaymentsRowComponent {
  @Input() current_data;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();
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

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit("Sei sicuro di volerlo archiviare?");
    } else if(request_type == "delete") {
      this.msg.emit("Sei sicuro di volerlo cancellare?");
    } else if(request_type == "rollback") {
      this.msg.emit("Sei sicuro di volerlo ripristinare?");
    }
    this.data.emit({item: this.current_data, request_type: request_type})
  }
}
