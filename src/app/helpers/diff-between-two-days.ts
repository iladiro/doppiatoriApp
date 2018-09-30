import {Injectable} from "@angular/core";
import {differenceInCalendarDays} from 'date-fns';

@Injectable()
export class DiffBetweenTwoDaysService {

  number_of_days: number[] = [];

  constructor() {}

  generate(first_date, second_date) {
    this.number_of_days = [];
    let diff_days = differenceInCalendarDays(
      new Date(first_date),
      new Date(second_date)
    );

    let split_value = diff_days.toString().split("-");
    let result = split_value[1];
    for(let i = 0; i <= Number(result); i++) {
      this.number_of_days.push(i + 1)
    }
    return this.number_of_days;
  }

}
