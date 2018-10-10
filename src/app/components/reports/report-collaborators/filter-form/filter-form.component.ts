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
  active:boolean = false;

  private params: string = "";

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) { }

  onChange(value, param) {
    let table_query = "contracts";
    let postgrest_query;
    if(param == 'month') {
      if(this.params == '') {
        this.params = "reference_month=eq." + value;
      } else {
        this.params += "&reference_month=eq." + value;
      }
    } else if(param == 'year') {
      if(this.params == '') {
        this.params = "reference_year=eq." + value;
      } else {
        this.params += "&reference_year=eq." + value;
      }
    } else if(param == 'dubber') {
      if(this.params == '') {
        this.params = "dubber_id=eq." + value;
      } else {
        this.params += "&dubber_id=eq." + value;
      }
    } else if(param == 'film') {
      if(this.params == '') {
        this.params = "film_id=eq." + value;
      } else {
        this.params += "&film_id=eq." + value;
      }
    }
    postgrest_query = this.params + "&select=reference_year, reference_month, film_id, film_title, dubber_id, dubber_fullname";
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        this.active = true;
        this.result_filtering = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  getOutNotEmptyParams(obj) {
    let data = {};
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") {
        data[key] = obj[key]
      }
    }
    return data;
  }

  search(data) {
    let not_empty_params = this.getOutNotEmptyParams(data.value);
    let query = this.buildUrl(not_empty_params);
    this.sendRequest(query);
  }

  buildUrl(obj_params) {
    let postgrest_query: string = "";
    for (var key in obj_params) {
      if(postgrest_query == '') {
        postgrest_query = key + "=eq." + obj_params[key];
      } else {
        postgrest_query += "&" + key + "=eq." + obj_params[key];
      }
    }
    postgrest_query += "&select=dubber_fullname,film_title,work_from,work_to,number_of_days,amount";
    return postgrest_query;
  }

  sendRequest(query) {
    let table_query = "contracts";
    this.ownService.getdata(table_query, query).subscribe(
      data => {
        console.log(data);
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

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      },
      err => {}
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers", "all");
    this.loadAllItems("films", "films", "all");
    this.years = this.print_years.generate(2004).reverse();
    this.months = this.print_months.generate();
  }

}
