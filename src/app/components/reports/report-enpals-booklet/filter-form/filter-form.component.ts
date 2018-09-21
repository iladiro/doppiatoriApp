import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';
import { ReportService } from '../../_services/report.service';

// Helpers
import { PrintYears } from '../../../../helpers/print-years';
import { PrintMonths } from '../../../../helpers/print-months';

@Component({
  selector: 'enpals-booklet-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class EnpalsBookletFilterFormComponent implements OnInit {

  date = new Date();
  date_fullYear;
  months: any = [];
  years: any = [];
  dubbers: any = [];
  @Output() list = new EventEmitter();

  selected_year:boolean = false;
  @Output() value_selected_year = new EventEmitter();

  constructor(
    private service: Service,
    private ownService: ReportService,
    private print_years: PrintYears,
    private print_months: PrintMonths
  ) { }

  onChange(value) {
    this.selected_year = true;
    this.value_selected_year.emit(value);
    let table_query = "contracts";
    let postgrest_query = "reference_year=eq." + value + "&select=dubber_id, dubber_fullname"
    this.ownService.getdata(table_query, postgrest_query).subscribe(
      data => {
        this.dubbers = data;
      },
      err => {
        console.log(err)
      }
    );
  }

  search(data) {
    let table_query = "contracts";
    if(data.value.dubber == "all") {
      let postgrest_query = "reference_year=eq." + Number(data.value.reference_year) + "&select=reference_month,reference_year,amount,enpals_data:dubber_enpals_data(quota_enpals_lavoratore,quota_enpals_ecc_massimale_lavoratore,quota_enpals_ditta,quota_enpals_ecc_massimale_ditta),dubber:dubbers(name,surname,enpals_cat:enpals_categories(qualification_id, qualification: qualifications(code,description)))";
      this.ownService.getdata(table_query, postgrest_query).subscribe(
        data => {
          data.forEach((item, index) => {
            item.enpals_data.sum_results = this.sumEnpalsData(item.enpals_data);
          });
          this.list.emit(data);
        },
        err => {
          console.log(err)
        }
      );
    } else {
      let postgrest_query = "reference_year=eq." + Number(data.value.reference_year) + "&" + "dubber_id=eq." + Number(data.value.dubber) + "&select=reference_month,reference_year,amount,enpals_data:dubber_enpals_data(quota_enpals_lavoratore,quota_enpals_ecc_massimale_lavoratore,quota_enpals_ditta,quota_enpals_ecc_massimale_ditta),dubber:dubbers(name,surname,enpals_cat:enpals_categories(qualification_id, qualification: qualifications(code,description)))";
      this.ownService.getdata(table_query, postgrest_query).subscribe(
        data => {
          data.forEach((item, index) => {
            item.enpals_data.sum_results = this.sumEnpalsData(item.enpals_data);
          });
          this.list.emit(data);
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  sumEnpalsData(current_element) {
    let total_enpals_worker = current_element.quota_enpals_lavoratore + current_element.quota_enpals_ecc_massimale_lavoratore;
    let total_enpals_company = current_element.quota_enpals_ditta + current_element.quota_enpals_ecc_massimale_ditta;
    let enpals_contributions = total_enpals_worker + total_enpals_company;
    let percentage_enpals = current_element.quota_enpals_lavoratore + current_element.quota_enpals_ditta;

    return {
      "total_enpals_worker": total_enpals_worker,
      "total_enpals_company": total_enpals_company,
      "enpals_contributions": enpals_contributions,
      "percentage_enpals": percentage_enpals
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
