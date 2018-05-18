import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Response } from "@angular/http";

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'formInvoice',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class InvoiceCreateComponent implements OnInit {

  @Input() dubber: any;
  @Output() event = new EventEmitter();
  id: number;
  companies: any = [];
  enpals_parameters: any = [];
  income_classes: any = [];
  data_empals_inps: any = {};

  enpals_category_cat_before = "A";
  enpals_category_cat_after = "B";
  enpals_category_cat_after_ACP = "C";

  constructor(
    private service: Service
  ) { }

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

    console.log(min_inps)

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

  private calcola_totale_enpals(commessa) {
    return (+commessa.quota_enpals_lavoratore + commessa.quota_enpals_ditta + commessa.quota_enpals_ecc_massimale_lavoratore + commessa.quota_enpals_ecc_massimale_ditta);
  }

  private computes(form: NgForm) {
    //console.log(this.enpals_parameters);
    let invoice = form.value;
    let enpals_category = this.dubber.enpals_categories[0];
    let commessa:any = {};
    commessa.max_enpals = this.calcola_massimale_enpals(invoice.amount, invoice.number_of_days, enpals_category, this.enpals_parameters, this.income_classes);
    commessa.amount_ecc_max = this.calcola_importo_eccedente_massimale(invoice.amount, invoice.number_of_days, enpals_category, this.enpals_parameters, this.income_classes);
    commessa.quota_enpals_lavoratore = this.calcola_quota_enpals_lavoratore(commessa.max_enpals, this.enpals_parameters);
    commessa.quota_enpals_ditta = this.calcola_quota_enpals_ditta(commessa.max_enpals, this.enpals_parameters);
    commessa.quota_enpals_ecc_max_lavoratore = this.calcola_quota_enpals_eccedente_lavoratore(commessa.amount_ecc_max, this.enpals_parameters);
    commessa.quota_enpals_ecc_max_ditta = this.calcola_quota_enpals_eccedente_ditta(commessa.amount_ecc_max, this.enpals_parameters);
    commessa.min_inps = this.calcola_minimale_inps(invoice.amount, invoice.number_of_days, this.enpals_parameters);
    commessa.min_inps_contribution = this.calcola_contributo_minimale_inps(commessa.min_inps, this.enpals_parameters);
    commessa.additional_rate = this.calcola_aliquota_aggiuntiva(invoice.amount, invoice.number_of_days, enpals_category, this.enpals_parameters);
    commessa.total_enpals = this.calcola_totale_enpals(commessa);
    this.data_empals_inps = commessa;
  }

  // private save(form: ngForm) {
  //   let date = new Date();
  //   this.service.create("invoices", current_invoice).subscribe(
  //     data => {
  //       let str = data.headers.get("location");
  //       let patt = /(\d+)/g;
  //       let result = str.match(patt);
  //       this.id = Number(result[0]);
  //       this.reloadList();
  //       this.event.emit("success");
  //     },
  //     err => {
  //       this.event.emit("rejected");
  //     }
  //   );
  //   form.reset();
  // }

  // private reloadList() {
  //   this.service.getManyById("invoices", "dubber_id", this.dubber.id).subscribe(
  //     data => {
  //       this.dubber.invoices = data;
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   );
  // }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("enpals_parameters", "enpals_parameters", "default");
    this.loadAllItems("companies", "companies", "all");
    this.loadAllItems("income_classes", "income_classes", "all");
  }

}
