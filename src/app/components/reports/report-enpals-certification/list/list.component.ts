import { Component, OnInit } from '@angular/core';

// Services
import { ReportService } from '../../_services/report.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ReportEnpalsCertificationComponent implements OnInit {

  list: any = [];
  selected_year;

  constructor(
    private ownService: ReportService
  ) { }

  private getData(data){
    this.list = data;
  }

  private getSelectedYear(year) {
    this.selected_year = year;
  }

  ngOnInit() {}

}
