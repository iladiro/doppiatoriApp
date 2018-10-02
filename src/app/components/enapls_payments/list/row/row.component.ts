import { Component, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

// Helpers
import { PrintYears } from '../../../../helpers/print-years';
import { PrintMonths } from '../../../../helpers/print-months';

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

  years: any = [];
  months: any = [];

  constructor(
    private service: Service,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) {}

  private editable() {
    this._readonly = false;
  }

  private readonly() {
    this._readonly = true;
    this.update();
  }

  private annull() {
    this._readonly = true;
    location.reload();
  }

  private update() {
    this.service.update("enpals_payments", this.current_data).subscribe(
      data => {
        this.msg.emit({ message: "success", type: "alert"});
      }
    );
  }

  private passDataToParent(request_type) {
    if(request_type == "archive") {
      this.msg.emit({ message: "Sei sicuro di volerlo archiviare?", type: "modal"});
    } else if(request_type == "delete") {
      this.msg.emit({ message: "Sei sicuro di volerlo cancellare?", type: "modal"});
    } else if(request_type == "rollback") {
      this.msg.emit({ message: "Sei sicuro di volerlo ripristinare?", type: "modal"});
    }
    this.data.emit({item: this.current_data, request_type: request_type})
  }

  ngOnInit() {
    this.years = this.print_years.generate("2004").reverse();
    this.months = this.print_months.generate();
  }
}
