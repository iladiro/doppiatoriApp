import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';
import { ReportService } from '../../_services/report.service';

// Helpers
import { PrintYears } from '../../../../helpers/print-years';
import { PrintMonths } from '../../../../helpers/print-months';

@Component({
  selector: 'report-collaborators-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormReportCollaboratorsComponent implements OnInit {

  @Output() list = new EventEmitter();

  months: any = [];
  years: number[] = [];
  result_filtering: any = [];

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) { }

  getOutNotEmptyParams(obj) {
    let data = {};
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") {
        data[key] = obj[key]
      }
    }
    return data;
  }

  buildUrl(obj_params, select_data) {
    let postgrest_query: any[] = [];
    for (var key in obj_params) {
      postgrest_query.push(key + "=eq." + obj_params[key]);
    }
    return postgrest_query.join("&") + select_data;
  }

  onChange(data) {
    let table_query = "contracts";
    let params_not_empty = this.getOutNotEmptyParams(data.value);
    let select_data = "&select=reference_year, reference_month, film_id, film_title, dubber_id, dubber_fullname";
    let postgrest_query = this.buildUrl(params_not_empty, select_data);
    console.log(postgrest_query);
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        this.result_filtering = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  search(data) {
    let select_data = "&select=dubber_fullname,film_title,work_from,work_to,number_of_days,amount";
    let not_empty_params = this.getOutNotEmptyParams(data.value);
    let query = this.buildUrl(not_empty_params, select_data);
    this.sendRequest(query);
  }

  sendRequest(query) {
    let table_query = "contracts";
    this.ownService.getdata(table_query, query).subscribe(
      data => {
        this.list.emit(data);
      },
      err => {
        console.log(err)
      }
    );
  }

  resetFilter() {
    this.result_filtering = [];
  }

  // loadAllItems(table, variable, condition) {
  //   this.service.getAll(table, condition).subscribe(
  //     data => {
  //       this[variable] = data;
  //     },
  //     err => {}
  //   );
  // }

  ngOnInit() {
    // this.loadAllItems("dubbers", "dubbers", "all");
    // this.loadAllItems("films", "films", "all");
    this.years = this.print_years.generate(2004).reverse();
    this.months = this.print_months.generate();
  }

}
