import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { ReportService } from '../../_services/report.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class EnpalsCertificationDetailsComponent implements OnInit {

  private year: number;
  private enpals_data: any = [];
  private enpals_employee: number;
  private enpals_company: number;
  private enpals_total: number;
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private ownService: ReportService
  ) { }

  enpalsCalculations() {
    let quota_enpals_lavoratore:number = 0;
    let quota_enpals_ecc_massimale_lavoratore:number = 0;
    let additional_rate:number = 0;
    let quota_enpals_ditta:number = 0;
    let quota_enpals_ecc_massimale_ditta:number = 0;

    this.enpals_data.map(function(item) {
      quota_enpals_lavoratore += item.enpals_data.quota_enpals_lavoratore;
      quota_enpals_ecc_massimale_lavoratore += item.enpals_data.quota_enpals_ecc_massimale_lavoratore;
      additional_rate += item.enpals_data.additional_rate;
      quota_enpals_ditta += item.enpals_data.quota_enpals_ditta;
      quota_enpals_ecc_massimale_ditta += item.enpals_data.quota_enpals_ecc_massimale_ditta;
    });

    this.enpals_employee = quota_enpals_lavoratore + quota_enpals_ecc_massimale_lavoratore + additional_rate;
    this.enpals_company = quota_enpals_ditta + quota_enpals_ecc_massimale_ditta;
    this.enpals_total = this.enpals_employee + this.enpals_company;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let dubber_id = +params['id']; // (+) converts string 'id' to a number
      this.year = +params['year'];
      let postgrest_query = "reference_year=eq." + this.year + "&dubber_id=eq." + dubber_id + "&select=reference_year,enpals_data:dubber_enpals_data(quota_enpals_lavoratore,quota_enpals_ecc_massimale_lavoratore,additional_rate,quota_enpals_ditta,quota_enpals_ecc_massimale_ditta),dubber:dubbers(name,surname,fiscal_code),company:companies(*)";
      let table_query = "contracts";
      this.ownService.getdata(table_query, postgrest_query).subscribe(
        data => {
          console.log(data);
          this.data = data[0];
          this.enpals_data = data;
        },
        err => {
          console.log(err)
        },
        () => this.enpalsCalculations()
      );
    });
  }

}
