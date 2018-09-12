import {Injectable} from "@angular/core";

@Injectable()
export class PrintMonths {

  months_string = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  months: any[] = [];

  constructor() {}

  generate() {
    for(let i = 0; i <= 11; i++) {
      let obj = {
        index: i + 1,
        text: this.months_string[i]
      };
      this.months.push(obj)
    }
    return this.months;
  }

}
