import {Injectable} from "@angular/core";

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
