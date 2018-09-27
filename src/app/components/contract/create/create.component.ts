import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

// Services
import { Service } from '../../../services/index';
import { DubberService } from '../../dubber/_services/index';

// Helpers
import { PrintYears } from '../../../helpers/print-years';
import { PrintMonths } from '../../../helpers/print-months';
import { DiffBetweenTwoDaysService } from '../../../helpers/diff-between-two-days';
import { CalculationEnpalsData } from '../helpers/calc-enpals-data';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ContractCreateComponent implements OnInit {

  number_of_days: number[] = [];

  date = new Date();
  months: string[] = [];
  years: number[] = [];
  alert_message: string;

  private films: any[] = [];
  private dubbers: any[] = [];
  private companies: any[] = [];
  private enpals_parameters: any = [];
  private income_classes: any = [];

  contract:any = {};
  dubber:any = {};
  //id_enpals_data: number;
  invoice: any = {};
  enpals_data: any = {};

  enpals_category_cat_before = "A";
  enpals_category_cat_after = "B";
  enpals_category_cat_after_ACP = "C";

  private work_from;
  private work_to;

  constructor(
    private diff_two_days: DiffBetweenTwoDaysService,
    private enpals_data_helpers: CalculationEnpalsData,
    private service: Service,
    private print_years: PrintYears,
    private print_months: PrintMonths,
    private dubberService: DubberService
  ) { }

  listOfDaysWorked(value, input) {
    if(input == 'work_from') {
      this.work_from = value;
    } else {
      this.work_to = value;
    }
    if(this.work_from && this.work_to) {
      this.number_of_days = this.diff_two_days.generate(this.work_from, this.work_to);
    }
  }

  private passData(form: NgForm) {
    let film = form.value.film.split(";");
    let dubber = form.value.dubber.split(";");
    this.contract = {
      "amount": form.value.amount,
      "film_id": film[0],
    	"film_title": film[1],
      "dubber_id": dubber[0],
      "dubber_fullname": dubber[1] + " " + dubber[2],
      "work_from": form.value.work_from,
      "work_to": form.value.work_to,
      "number_of_days": form.value.number_of_days,
      "creation_date": this.date.toLocaleDateString(),
      "note": form.value.note,
      "reference_month": form.value.reference_month,
      "reference_year": form.value.reference_year,
      "company_id": form.value.company_id
    }
    form.value.film_id = film[0];
    form.value.dubber_id = dubber[0];
    delete form.value['film'];
    delete form.value['dubber'];
    delete form.value['note'];
    this.recoversData(form.value);
  }

  // Prima recuperare i dati del dubber selezionato
  private recoversData(form_data) {
    this.dubberService.getById(form_data.dubber_id).subscribe(
      data => {
        this.dubber = data;
        this.computesEnpalsData(form_data);
      },
      err => {
        console.log(err);
      }
    );
  }

  private computesEnpalsData(form_data) {
    let commessa: any = {};
    let enpals_category = this.dubber.enpals_categories[0];
    commessa.amount = form_data.amount;
    commessa.max_enpals = this.enpals_data_helpers.massimale_enpals(this.enpals_category_cat_before, this.enpals_category_cat_after_ACP, form_data.amount, form_data.number_of_days, enpals_category, this.enpals_parameters, this.income_classes);
    commessa.amount_ecc_max = this.enpals_data_helpers.importo_eccedente_massimale(this.enpals_category_cat_before, this.enpals_category_cat_after_ACP, form_data.amount, form_data.number_of_days, enpals_category, this.enpals_parameters, this.income_classes);
    commessa.quota_enpals_lavoratore = this.enpals_data_helpers.quota_enpals_lavoratore(commessa.max_enpals, this.enpals_parameters);
    commessa.quota_enpals_ditta = this.enpals_data_helpers.quota_enpals_ditta(commessa.max_enpals, this.enpals_parameters);
    commessa.quota_enpals_ecc_massimale_lavoratore = this.enpals_data_helpers.quota_enpals_eccedente_lavoratore(commessa.amount_ecc_max, this.enpals_parameters);
    commessa.quota_enpals_ecc_massimale_ditta = this.enpals_data_helpers.quota_enpals_eccedente_ditta(commessa.amount_ecc_max, this.enpals_parameters);
    commessa.min_inps = this.enpals_data_helpers.minimale_inps(form_data.amount, form_data.number_of_days, this.enpals_parameters);
    commessa.min_contribution_inps = this.enpals_data_helpers.contributo_minimale_inps(commessa.min_inps, this.enpals_parameters);
    commessa.additional_rate = this.enpals_data_helpers.aliquota_aggiuntiva(this.enpals_category_cat_before, form_data.amount, form_data.number_of_days, enpals_category, this.enpals_parameters);
    commessa.trattenuta_pensione = this.enpals_data_helpers.trattenuta_pensione(commessa);
    commessa.total_enpals = this.enpals_data_helpers.total_enpals(commessa);

    this.enpals_data = commessa;
    this.invoice = form_data;
  }

  private save() {
    this.saveEnpalsData();
  }

  private saveEnpalsData() {
    this.enpals_data.dubber_id = this.dubber.id;
    this.enpals_data.film_id = this.contract.film_id;
    this.service.create("dubber_enpals_data", this.enpals_data).subscribe(
      data => {
        let str = data.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.enpals_data.id = Number(result[0]);
        this.saveInvoice(this.enpals_data.id);
      },
      err => {
        this.alert_message = "rejected";
      }
    );
  }

  private updateRecord(table, parameter, data, id) {
    let obj = {
      "id": id,
      [parameter]: data
    };
    this.service.update(table, obj).subscribe(
      err => {
        console.log(err)
      }
    )
  }

  private saveInvoice(id_enapals_data) {
    this.computes();
    this.invoice.creation_date = this.date.toLocaleDateString();
    this.invoice.enpals_data_id = id_enapals_data;
    this.service.create("invoices", this.invoice).subscribe(
      data => {
        let str = data.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.invoice.id = Number(result[0]);
        this.contractCreate();
        this.updateRecord("dubber_enpals_data", "invoice_id", this.invoice.id, this.enpals_data.id);
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    );
  }

  private contractCreate() {
    this.contract.invoice_id = this.invoice.id;
    this.contract.enpals_data_id = this.enpals_data.id;
    this.service.create("contracts", this.contract).subscribe(
      data => {
        let str = data.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.contract.id = Number(result[0]);
        this.alert_message = "success";
        this.updateRecord("dubber_enpals_data", "contract_id", this.contract.id, this.enpals_data.id);
        this.updateRecord("invoices", "contract_id", this.contract.id, this.invoice.id);
        //this.addFilmDubbersInRelationTable();
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    );
  }

  private computes() {
    let enpals_category = this.dubber.enpals_categories[0];
    if((this.dubber.vat == "") || (enpals_category.forfettone == 1) || (enpals_category.forfettone == 2)) {
      this.invoice.vat = 0;
      this.invoice.total_amount = this.invoice.amount;
    } else {
      this.invoice.vat = (+this.invoice.amount * 22) / 100;
      this.invoice.total_amount = this.invoice.amount - this.invoice.vat;
    }

    this.invoice.total_enpals = this.enpals_data.quota_enpals_lavoratore + this.enpals_data.quota_enpals_ecc_massimale_lavoratore;
    this.invoice.total_deductions = this.enpals_data.trattenuta_pensione + this.invoice.total_enpals + this.enpals_data.additional_rate;
    if (enpals_category.ritenuta_acconto == true) {
      this.invoice.total_deductions += (+this.invoice.amount * 20 /100);
    }

    if(enpals_category.trattenuta_sindacale == true) {
      this.invoice.trattenuta_sindacale = +(this.invoice.amount - this.invoice.total_deductions) * this.enpals_parameters.percentuale_trattenuta_sindacale / 100;
      this.invoice.total_deductions += this.invoice.trattenuta_sindacale;
    }

    this.invoice.total_net = (+this.invoice.total_amount - this.invoice.total_deductions);
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.years = this.print_years.generate(2004).reverse();
    this.months = this.print_months.generate();
    this.loadAllItems("companies", "companies", "all");
    this.loadAllItems("films", "films", "all");
    this.loadAllItems("dubbers", "dubbers", "not_archived");
    this.loadAllItems("enpals_parameters", "enpals_parameters", "default");
    this.loadAllItems("income_classes", "income_classes", "all");
  }

}
