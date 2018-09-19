import { Component, OnInit } from '@angular/core';

// Services
import { Service } from '../../../services/index';
import { ReportService } from '../_services/report.service';

// Helpers
import { PrintYears } from '../../../helpers/print-years';
import { PrintMonths } from '../../../helpers/print-months';

@Component({
  selector: 'report-monthly-cost-enpals',
  templateUrl: './report-monthly-cost-enpals.component.html',
  styleUrls: ['./report-monthly-cost-enpals.component.scss']
})
export class ReportMonthlyCostEnpalsComponent implements OnInit {

  months: any = [];
  years: any = [];

  selected_month: boolean = false;
  result_tot_enpals:number;
  films_list: any = [];

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) { }

  onChange(type, value) {
    this.selected_month = true;
  }

  search(data) {
    let table_query = "contracts";
    let postgrest_query = "reference_month=eq." + data.value.reference_month + "&reference_year=eq." + data.value.reference_year + "&select=title:film_title,amount_enpals:dubber_enpals_data(total_enpals)";
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        this.films_list = data;
        let result: any = data;
        let enpals_amounts: any[] = [];
        result.map(function(entry) {
          enpals_amounts.push(entry.amount_enpals.total_enpals);
        });
        this.sum(enpals_amounts);
      },
      err => {
        console.log(err)
      }
    );
  }

  sum(enpals_amounts) {
    if(enpals_amounts.length > 1) {
      this.result_tot_enpals = enpals_amounts.reduce(function(a, b) {
        return a + b;
      }, 0);
    } else {
      this.result_tot_enpals = enpals_amounts;
    }
  }

  ngOnInit() {
    this.years = this.print_years.generate(2004).reverse();
    this.months = this.print_months.generate();
  }

}
