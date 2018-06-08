import { Component, OnInit, Input } from '@angular/core';

// Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnpalsPaymentsListComponent implements OnInit {

  enpals_payments: any = [];
  private editable_values = false;

  //@Input() highlightColor: string;

  constructor(
    private service: Service
  ) {}

  setEditableInput() {
    this.editable_values = true;
    //this.highlightColor = "editable";
  }

  restoreReadonlyInput() {
    //this.highlightColor = "readonly";
    this.editable_values = false;
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("enpals_payments", "enpals_payments", "all");
  }

}
