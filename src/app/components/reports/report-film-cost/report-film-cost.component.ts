import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';
import { ReportService } from '../_services/report.service';

// Helpers
import { PrintYears } from '../../../helpers/print-years';
//import { PrintMonths } from '../../../helpers/print-months';

@Component({
  selector: 'app-report-film-cost',
  templateUrl: './report-film-cost.component.html',
  styleUrls: ['./report-film-cost.component.scss']
})
export class ReportFilmCostComponent implements OnInit {

  films: any = [];
  //months: any = [];
  years: any = [];

  result_amount:number;
  result_tot_enpals:number;

  selected_year: boolean = false;
  value_selected_year:string = "";

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    //private print_months: PrintMonths
  ) { }

  onChange(type, value) {
    this.selected_year = true;
    if(type == "year") {
      this.value_selected_year = value;
      this.ownService.getFilmsListFromYear(value).subscribe(
        data => {
          //console.log(data);
          this.films = data;
        },
        err => {
          console.log(err)
        }
      );
    } else if(type == "film") {
      this.ownService.getCostFilm(value, this.value_selected_year).subscribe(
        data => {
          let amounts: any[] = [];
          let totals_enpals: any[] = [];
          data.forEach(function(entry) {
            amounts.push(entry.amount);
            totals_enpals.push(entry.dubber_enpals_data.total_enpals);
          });
          this.sum(amounts, totals_enpals);
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  sum(amounts, totals_enpals) {
    if(amounts.length > 1 || totals_enpals.length > 1) {
      this.result_amount = amounts.reduce(function(a, b) {
        return a + b;
      }, 0);
      this.result_tot_enpals = totals_enpals.reduce(function(a, b) {
        return a + b;
      }, 0);
    } else {
      this.result_amount = amounts;
      this.result_tot_enpals = totals_enpals;
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
    this.loadAllItems("films", "films", "all");
    this.years = this.print_years.generate("2004").reverse();
    //this.months = this.print_months.generate();
  }

}
