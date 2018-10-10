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

  months: any = [];
  years: number[] = [];
  dubbers: any = [];
  films_dubbers: any = [];
  @Output() list = new EventEmitter();
  active:boolean = false;

  reference_month: string;
  reference_year: string;

  query: string = "";

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) { }

  onChange(value, param) {
    console.log(value);
    let table_query = "contracts";
    let postgrest_query: string = "";
    if(param == 'month') {
      this.reference_month = value;
      if(this.reference_year) {
        postgrest_query = "reference_month=eq." + value + "&reference_year=eq." + this.reference_year + "&select=reference_year, film_id, film_title, dubber_id, dubber_fullname";
      } else {
        postgrest_query = "reference_month=eq." + value + "&select=reference_year, film_id, film_title, dubber_id, dubber_fullname";
      }
    } else if(param == 'year') {
      this.reference_year = value;
      if(this.reference_month) {
        postgrest_query = "reference_month=eq." + this.reference_month + "&reference_year=eq." + value + "&select=reference_year,reference_month,film_id, film_title, dubber_id, dubber_fullname";
      } else {
        postgrest_query = "reference_year=eq." + value + "&select=reference_year,reference_month,film_id, film_title, dubber_id, dubber_fullname";
      }
    } else if(param == 'dubber') {
      if(this.reference_year && this.reference_month) {
        console.log("anno e mese");
        postgrest_query = "reference_month=eq." + this.reference_month + "&reference_year=eq." + this.reference_year + "&dubber_id=eq." + value + "&select=reference_year,reference_month,film_id, film_title, dubber_id, dubber_fullname";
      } else if(this.reference_year) {
        console.log("solo anno");
        postgrest_query = "reference_year=eq." + this.reference_year + "&dubber_id=eq." + value + "&select=reference_year,reference_month,film_id, film_title, dubber_id, dubber_fullname";
      } else if(this.reference_month) {
        console.log("solo mese");
        postgrest_query = "reference_month=eq." + this.reference_month + "&dubber_id=eq." + value + "&select=reference_year,reference_month,film_id, film_title, dubber_id, dubber_fullname";
      }
    }
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        console.log(data);
        this.active = true;
        this.films_dubbers = data;
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
    this.films_dubbers = [];
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
