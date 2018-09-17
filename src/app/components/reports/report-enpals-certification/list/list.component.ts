import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../../services/index';
import { ReportService } from '../../_services/report.service';

// Helpers
import { PrintYears } from '../../../../helpers/print-years';
import { PrintMonths } from '../../../../helpers/print-months';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ReportEnpalsCertificationComponent implements OnInit {

  date = new Date();
  date_fullYear;

  list: any = [];
  months: any = [];
  years: any = [];
  dubbers: any = [];

  selected_year:boolean = false;

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) { }

  onChange(value) {
    this.selected_year = true;
    this.ownService.getDubbersListFromYear(value).subscribe(
      data => {
        this.dubbers = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  search(data) {
    if(data.value.dubber == "all") {
      console.log("tutti");
      this.ownService.getAllDubbersOfThatYear(Number(data.value.reference_year)).subscribe(
        data => {
          this.list = data;
          console.log(data);
        },
        err => {
          console.log(err)
        }
      );
    } else {
      this.ownService.getDubberSelected(Number(data.value.dubber), Number(data.value.reference_year)).subscribe(
        data => {
          this.list = data;
          console.log(data);
        },
        err => {
          console.log(err)
        }
      );
    }
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
    this.date_fullYear = this.date.getFullYear();
    this.loadAllItems("dubbers", "dubbers", "all");
    this.years = this.print_years.generate(2004).reverse();
    this.months = this.print_months.generate();
  }

}
