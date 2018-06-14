import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { TableRowEnpalsPaymentsComponent } from './viewchild/table-row.component';

// Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnpalsPaymentsListComponent implements OnInit {

  enpals_payments: any = [];

  @ViewChild(TableRowEnpalsPaymentsComponent) row: TableRowEnpalsPaymentsComponent;

  constructor(
    private service: Service
  ) {}

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
