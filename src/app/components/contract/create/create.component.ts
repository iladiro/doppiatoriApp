import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

// Services
import { Service } from '../../../services/index';
import { DubberService } from '../../dubber/_services/index';

// Helpers
import { PrintYears } from '../../../helpers/print-years';
import { PrintMonths } from '../../../helpers/print-months';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ContractCreateComponent implements OnInit {

  private films: any[] = [];
  private dubbers: any[] = [];
  private companies: any[] = [];
  //@Output() msg = new EventEmitter();
  private alert_message;

  contract:any = {};
  dubber:any = {};
  id_enpals_data: number;
  enpals_parameters: any = [];
  income_classes: any = [];
  invoice: any = {};
  enpals_data: any = {};

  enpals_category_cat_before = "A";
  enpals_category_cat_after = "B";
  enpals_category_cat_after_ACP = "C";

  date = new Date();
  months: any = [];
  years: any = [];

  constructor(
    private service: Service,
    private print_years: PrintYears,
    private print_months: PrintMonths,
    private dubberService: DubberService
  ) { }

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
      "creation_date": this.date.toLocaleDateString()
    }
    form.value.film_id = film[0];
    form.value.dubber_id = dubber[0];
    delete form.value['film'];
    delete form.value['dubber'];
    console.log(form.value);
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
    commessa.max_enpals = this.calcola_massimale_enpals(form_data.amount, form_data.number_of_days, enpals_category, this.enpals_parameters, this.income_classes);
    commessa.amount_ecc_max = this.calcola_importo_eccedente_massimale(form_data.amount, form_data.number_of_days, enpals_category, this.enpals_parameters, this.income_classes);
    commessa.quota_enpals_lavoratore = this.calcola_quota_enpals_lavoratore(commessa.max_enpals, this.enpals_parameters);
    commessa.quota_enpals_ditta = this.calcola_quota_enpals_ditta(commessa.max_enpals, this.enpals_parameters);
    commessa.quota_enpals_ecc_massimale_lavoratore = this.calcola_quota_enpals_eccedente_lavoratore(commessa.amount_ecc_max, this.enpals_parameters);
    commessa.quota_enpals_ecc_massimale_ditta = this.calcola_quota_enpals_eccedente_ditta(commessa.amount_ecc_max, this.enpals_parameters);
    commessa.min_inps = this.calcola_minimale_inps(form_data.amount, form_data.number_of_days, this.enpals_parameters);
    commessa.min_contribution_inps = this.calcola_contributo_minimale_inps(commessa.min_inps, this.enpals_parameters);
    commessa.additional_rate = this.calcola_aliquota_aggiuntiva(form_data.amount, form_data.number_of_days, enpals_category, this.enpals_parameters);
    commessa.trattenuta_pensione = this.calcola_trattenuta_pensione(commessa);
    commessa.total_enpals = this.calcola_total_enpals(commessa);
    this.enpals_data = commessa;
    this.invoice = form_data;
    console.log(this.invoice);
  }

  private calcola_quota_enpals_lavoratore(max_enpals, enpals_parameters) {
    return (+max_enpals * enpals_parameters.quota_enpals_lavoratore) / 100;
  }

  private calcola_quota_enpals_ditta(max_enpals, enpals_parameters) {
    return (+max_enpals * enpals_parameters.quota_enpals_ditta) / 100;
  }

  private calcola_massimale_enpals(amount, days, enpals_category, enpals_parameters, income_classes) {
    let max_enpals:number;
    let max_per_days:number;

    if(enpals_category.cat_contrib == this.enpals_category_cat_before || enpals_category.cat_contrib == this.enpals_category_cat_after_ACP) {
      let amount_per_day = +amount / days;
      let amount_income_classes_per_day = this.get_importo_fascia_retributiva(amount_per_day, this.income_classes);
      if(amount_income_classes_per_day == null) {
        max_per_days = +enpals_parameters.massimale_enpals_ante * days;
        if(amount <= max_per_days) {
          max_enpals = amount;
        } else {
          max_enpals = max_per_days
        }
      } else {
        max_enpals = +amount_income_classes_per_day * days;
      }
    } else {
      max_per_days = +enpals_parameters.massimale_enpals_dopo * days;
      if(amount <= max_per_days) {
        max_enpals = amount;
      } else {
        max_enpals = max_per_days;
      }
    }

    return max_enpals
  }

  private calcola_importo_eccedente_massimale(amount, days, enpals_category, enpals_parameters, income_classes) {
    let amount_ecc_max = 0.0;
    let max_per_days:number;

    if(enpals_category.cat_contrib == this.enpals_category_cat_before || enpals_category.cat_contrib == this.enpals_category_cat_after_ACP) {
      let amount_per_day = +amount / days;
      let amount_income_classes_per_day = this.get_importo_fascia_retributiva(amount_per_day, this.income_classes);
      if(amount_income_classes_per_day == null) {
        max_per_days = +enpals_parameters.massimale_enpals_ante * days;
        if(amount > max_per_days) {
          amount_ecc_max = +amount - max_per_days;
        }
      } else{
        amount_ecc_max = amount - (+amount_income_classes_per_day * days);
      }
    } else {
      max_per_days = +enpals_parameters.massimale_enpals_dopo * days;
      if(amount > max_per_days) {
        amount_ecc_max = +amount - max_per_days;
      }
    }

    return amount_ecc_max
  }

  private calcola_quota_enpals_eccedente_lavoratore(amount_ecc_max, enpals_parameters) {
    return (+amount_ecc_max * enpals_parameters.quota_enpals_ecc_massimale_lavoratore) / 100;
  }

  private calcola_quota_enpals_eccedente_ditta(amount_ecc_max, enpals_parameters) {
    return (+amount_ecc_max * enpals_parameters.quota_enpals_ecc_massimale_ditta) / 100;
  }

  private calcola_minimale_inps(amount, days, enpals_parameters) {
    let min_inps:number;
    if((+amount / days) < enpals_parameters.minimale_inps) {
      min_inps = amount;
    } else {
      min_inps = (+enpals_parameters.minimale_inps * days)
    }

    return min_inps
  }

  private calcola_contributo_minimale_inps(min_inps, enpals_parameters) {
    return (+min_inps * enpals_parameters.percentuale_minimale_inps) / 100;
  }

  private calcola_aliquota_aggiuntiva(amount, days, enpals_category, enpals_parameters) {
    let additional_rate = 0.0;
    let taxable;
    if(enpals_category.cat_contrib == this.enpals_category_cat_before) {
      if((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount < (enpals_parameters.massimale_enpals_ante * days))) {
        taxable = amount - (+enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
        additional_rate = (+taxable * 1) / 100;
      }
    } else if((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount > (enpals_parameters.massimale_enpals_ante * days))) {
      taxable = (+enpals_parameters.massimale_enpals_ante * days) - (+enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
      additional_rate = (+taxable * 1) / 100;
    } else {
      if((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount < (enpals_parameters.massimale_enpals_dopo * days))) {
        taxable = amount - (+enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
        additional_rate = (+taxable * 1) / 100;
      } else if ((amount > (+enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount > (+enpals_parameters.massimale_enpals_dopo * days))) {
        taxable = (+enpals_parameters.massimale_enpals_dopo * days) - (+enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
        additional_rate = (+taxable * 1) / 100;
      }
    }

    return additional_rate
  }

  private get_importo_fascia_retributiva(amount, income_classes) {
    let result:number;
    income_classes.forEach((item, index) => {
      if((amount >= item.starting_from) && (amount <= item.up_to)) {
        result = item.euro;
      } else {
        result = null;
      }
    });
    return result
  }

  private calcola_trattenuta_pensione(commessa) {
    return 0.0
  }

  private calcola_total_enpals(commessa) {
    return +(commessa.quota_enpals_lavoratore + commessa.quota_enpals_ditta + commessa.quota_enpals_ecc_massimale_lavoratore + commessa.quota_enpals_ecc_massimale_ditta);
  }

  private save() {
    this.saveEnpalsData();
  }

  private saveEnpalsData() {
    //this.enpals_data.invoice_id = invoice_id;
    this.enpals_data.dubber_id = this.dubber.id;
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

  private saveInvoice(id_enapals_data) {
    this.computes();
    this.invoice.creation_date = this.date.toLocaleDateString();
    this.invoice.enpals_data_id = id_enapals_data;
    this.service.create("invoices", this.invoice).subscribe(
      data => {
        //this.alert_message = "success";
        this.contractCreate(this.contract);
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    );
  }

  private contractCreate(data) {
    this.service.create("contracts", data).subscribe(
      data => {
        this.alert_message = "success";
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
    this.years = this.print_years.generate("2004").reverse();
    this.months = this.print_months.generate();
    this.loadAllItems("companies", "companies", "all");
    this.loadAllItems("films", "films", "all");
    this.loadAllItems("dubbers", "dubbers", "not_archived");
    this.loadAllItems("enpals_parameters", "enpals_parameters", "default");
    this.loadAllItems("income_classes", "income_classes", "all");
  }

}
