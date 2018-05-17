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

  enpals_category_cat_before = "A";
  enpals_category_cat_after = "B";
  enpals_category_cat_after_ACP = "C";

  constructor(
    private service: Service
  ) { }

  private calcola_quota_enpals_lavoratore(max_enpals, enpals_parameters) {
    let quota_enpals_lavoratore = (max_enpals * enpals_parameters.quota_enpals_lavoratore) / 100;
    return quota_enpals_lavoratore
  }

  private calcola_quota_enpals_ditta(max_enpals, enpals_parameters) {
    let quota_enpals_ditta = (max_enpals * enpals_parameters.quota_enpals_ditta) / 100;
    return quota_enpals_ditta
  }

  private calcola_massimale_enpals(amount, days, enpals_category, enpals_parameters, income_classes) {
    let max_enpals = null;
    let max_per_days = null;

    if(enpals_category.cat_contrib == this.enpals_category_cat_before || enpals_category.cat_contrib == this.enpals_category_cat_after_ACP) {
      let amount_per_days = amount / days;
      // let amount_income_classes_per_day = get_importo_fascia_retributiva(amount_per_day, income_classes);
      let amount_income_classes_per_day = null;
      if(amount_income_classes_per_day == null) {
        max_per_days = (enpals_parameters.massimale_enpals_ante * days);
        if(amount <= max_per_days) {
          max_enpals = amount;
        } else {
          max_enpals = max_per_days
        }
      } else {
        max_enpals = (amount_income_classes_per_day * days);
      }
    } else {
      max_per_days = (enpals_parameters.massimale_enpals_dopo * days);
      if(amount <= max_per_days) {
        max_enpals = amount
      } else {
        max_enpals = max_per_days
      }
    }
  }

  private calcola_importo_eccedente_massimale(amount, days, enpals_category, enpals_parameters, income_classes) {
    let amount_ecc_max = 0.0;
    let max_per_days = null;
    if(enpals_category.cat_contrib == this.enpals_category_cat_before || enpals_category.cat_contrib == this.enpals_category_cat_after_ACP) {
      let amount_per_day = amount / days;
      // let amount_income_classes_per_day = get_importo_fascia_retributiva(amount_per_day, income_classes);
      let amount_income_classes_per_day = null;
      if(amount_income_classes_per_day == null) {
        max_per_days = (enpals_parameters.massimale_enpals_ante * days);
        if(amount > max_per_days) {
          amount_ecc_max = (amount - max_per_days);
        }
      } else{
        amount_ecc_max = amount - (amount_income_classes_per_day * days);
      }
    } else {
      max_per_days = (enpals_parameters.massimale_enpals_dopo * days);
      if(amount > max_per_days) {
        amount_ecc_max = (amount - max_per_days);
      }
    }
  }

  private calcola_quota_enpals_eccedente_lavoratore(amount_ecc_max, enpals_parameters) {
    let quota_enpals_eccedente_lavoratore = (amount_ecc_max * enpals_parameters.quota_enpals_ecc_massimale_lavoratore) / 100
    return quota_enpals_eccedente_lavoratore;
  }

  private calcola_quota_enpals_eccedente_ditta(amount_ecc_max, enpals_parameters) {
    let quota_enpals_eccedente_ditta = (amount_ecc_max * enpals_parameters.quota_enpals_ecc_massimale_ditta) / 100
    return quota_enpals_eccedente_ditta
  }

  private calcola_minimale_inps(amount, days, enpals_parameters) {
    let min_inps = null;
    if((amount / days) < enpals_parameters.minimale_inps) {
      min_inps = amount;
    } else {
      min_inps = (enpals_parameters.minimale_inps * days)
    }

    return min_inps
  }

  private calcola_contributo_minimale_inps(min_inps, enpals_parameters) {
    let min_contribution_inps = (min_inps * enpals_parameters.percentuale_minimale_inps) / 100
    return min_contribution_inps
  }

  private calcola_aliquota_aggiuntiva(amount, days, enpals_category, enpals_parameters) {
    let additional_rate = 0.0;
    let taxable;
    if(enpals_category.cat_contrib == this.enpals_category_cat_before) {
      if((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount < (enpals_parameters.massimale_enpals_ante * days))) {
        taxable = amount - (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
        additional_rate = (taxable * 1) / 100;
      }
    } else if((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount > (enpals_parameters.massimale_enpals_ante * days))) {
      taxable = (enpals_parameters.massimale_enpals_ante * days) - (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
      additional_rate = (taxable * 1) / 100;
    } else {
      if((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount < (enpals_parameters.massimale_enpals_dopo * days))) {
        taxable = amount - (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
        additional_rate = (taxable * 1) / 100;
      } else if ((amount > (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days)) && (amount > (enpals_parameters.massimale_enpals_dopo * days))) {
        taxable = (enpals_parameters.massimale_enpals_dopo * days) - (enpals_parameters.minimale_giornaliero_aliquota_aggiuntiva * days);
        additional_rate = (taxable * 1) / 100;
      }
    }
  }

  private calcola_totale_enpals(commessa) {
    let total_enpals = (commessa.quota_enpals_lavoratore + commessa.quota_enpals_ditta + commessa.quota_enpals_ecc_massimale_lavoratore + commessa.quota_enpals_ecc_massimale_ditta);
    return total_enpals
  }





  // private compensationCalculation(gross, percentual) {
  //   let difference = (gross * percentual) / 100;
  //   let result_net = gross - difference;
  //   return [difference, result_net]
  // }

  private computes() {}

  private save() {}

  // // private create(form: NgForm, event) {
  // //   let date = new Date();
  // //   let current_invoice = form.value;
  // //
  // //   let result = this.compensationCalculation(current_invoice.gross, current_invoice.tax_percetual);
  // //
  // //   current_invoice.creation_date = date.toLocaleDateString();
  // //   current_invoice.gross = +current_invoice.gross;
  // //   current_invoice.net = +result[1];
  // //   current_invoice.tax_percetual = +current_invoice.tax_percetual;
  // //   current_invoice.tax_euro = +result[0];
  // //   current_invoice.dubber_id = +this.dubber.id;
  // //   current_invoice.company_id = +current_invoice.company_id;
  // //
  // //   this.service.create("invoices", current_invoice).subscribe(
  // //     data => {
  // //       let str = data.headers.get("location");
  // //       let patt = /(\d+)/g;
  // //       let result = str.match(patt);
  // //       this.id = Number(result[0]);
  // //       this.reloadList();
  // //       this.event.emit("success");
  // //     },
  // //     err => {
  // //       this.event.emit("rejected");
  // //     }
  // //   );
  // //
  // //   form.reset();
  // // }
  //
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

  loadAllItems(table, variable) {
    this.service.getAll(table, "all").subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("enpals_parameters", "enpals_parameters");
    this.loadAllItems("companies", "companies");
    this.loadAllItems("income_classes", "income_classes");
  }

}
