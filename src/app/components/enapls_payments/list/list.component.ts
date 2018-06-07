import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnpalsPaymentsListComponent implements OnInit {

  enpals_payments: any = [];

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
