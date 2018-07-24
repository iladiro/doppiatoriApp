import {Injectable} from "@angular/core";
// import {Http} from "@angular/http";
// import {TranslateService} from "ng2-translate";

@Injectable()
export class PrintYears {

  date = new Date();
  years: number[] = [];

  constructor() {}

  generate(from) {
    let current_year = this.date.getFullYear();
    for(let i = from; i <= current_year; i++) {
      this.years.push(i)
    }
    return this.years;
  }

}
