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

  onChange(value) {
    let table_query = "contracts";
    let postgrest_query = "reference_year=eq." + value + "&select=film_id, film_title";
    this.selected_year = true;
    this.value_selected_year = value;
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        this.films = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  search(data) {
    let reference_year = +data.value.reference_year;
    let film_id = +data.value.film_id;
    let table_query = "contracts";
    let postgrest_query = "film_id=eq." + film_id + "&reference_year=eq." + reference_year + "&select=amount,dubber_enpals_data:dubber_enpals_data(quota_enpals_ditta)";
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        let result: any = data;
        let amounts: any[] = [];
        let totals_enpals: any[] = [];
        result.map(function(entry) {
          amounts.push(entry.amount);
          totals_enpals.push(entry.dubber_enpals_data.quota_enpals_ditta);
        });
        this.sum(amounts, totals_enpals);
      },
      err => {
        console.log(err)
      }
    );
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
