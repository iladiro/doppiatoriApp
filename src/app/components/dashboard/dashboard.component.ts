import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../user/_models/index';
import { Dubber } from '../dubber/_models/index';
import { Film } from '../film/_models/index';

// Services
import { Service } from '../../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  current_user: User;
  dubbers: any = [];
  films: any = [];

  constructor(
    private service: Service
  ) {
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("films", "films", "all");
    this.loadAllItems("dubbers", "dubbers", "not_archived");
  }

}
