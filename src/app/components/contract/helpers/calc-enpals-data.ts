import {Injectable} from "@angular/core";

@Injectable()
export class CalculationEnpalsData {

  constructor() {}

  get_importo_fascia_retributiva(amount, income_classes) {
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

  quota_enpals_lavoratore(max_enpals, enpals_parameters) {
    return (+max_enpals * enpals_parameters.quota_enpals_lavoratore) / 100;
  }

  quota_enpals_ditta(max_enpals, enpals_parameters) {
    return (+max_enpals * enpals_parameters.quota_enpals_ditta) / 100;
  }

  massimale_enpals(enpals_cat_before, enpals_cat_after_acp, amount, days, enpals_category, enpals_parameters, income_classes) {
    let max_enpals:number;
    let max_per_days:number;

    if(enpals_category.cat_contrib == enpals_cat_before || enpals_category.cat_contrib == enpals_cat_after_acp) {
      let amount_per_day = +amount / days;
      let amount_income_classes_per_day = this.get_importo_fascia_retributiva(amount_per_day, income_classes);
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

  importo_eccedente_massimale(enpals_cat_before, enpals_cat_after_acp, amount, days, enpals_category, enpals_parameters, income_classes) {
    let amount_ecc_max = 0.0;
    let max_per_days:number;

    if(enpals_category.cat_contrib == enpals_cat_before || enpals_category.cat_contrib == enpals_cat_after_acp) {
      let amount_per_day = +amount / days;
      let amount_income_classes_per_day = this.get_importo_fascia_retributiva(amount_per_day, income_classes);
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

  quota_enpals_eccedente_lavoratore(amount_ecc_max, enpals_parameters) {
    return (+amount_ecc_max * enpals_parameters.quota_enpals_ecc_massimale_lavoratore) / 100;
  }

  quota_enpals_eccedente_ditta(amount_ecc_max, enpals_parameters) {
    return (+amount_ecc_max * enpals_parameters.quota_enpals_ecc_massimale_ditta) / 100;
  }

  minimale_inps(amount, days, enpals_parameters) {
    let min_inps:number;
    if((+amount / days) < enpals_parameters.minimale_inps) {
      min_inps = amount;
    } else {
      min_inps = (+enpals_parameters.minimale_inps * days)
    }

    return min_inps
  }

  contributo_minimale_inps(min_inps, enpals_parameters) {
    return (+min_inps * enpals_parameters.percentuale_minimale_inps) / 100;
  }

  aliquota_aggiuntiva(enpals_cat_before, amount, days, enpals_category, enpals_parameters) {
    let additional_rate = 0.0;
    let taxable;
    if(enpals_category.cat_contrib == enpals_cat_before) {
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

  trattenuta_pensione(commessa) {
    return 0.0
  }

  total_enpals(commessa) {
    return +(commessa.quota_enpals_lavoratore + commessa.quota_enpals_ditta + commessa.quota_enpals_ecc_massimale_lavoratore + commessa.quota_enpals_ecc_massimale_ditta);
  }

}
