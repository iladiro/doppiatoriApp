import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

// Models
import { EnpalParameter } from '../_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnpalsParametersListComponent implements OnInit {

  private enpals_parameters: any = [];

  constructor(
    private service: Service
  ) { }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("enpals_parameters", "enpals_parameters", "all");
  }

}
