import {Injectable} from "@angular/core";

@Injectable()
export class TakeOutNotEmptyParams {

  constructor() {}

  run(obj) {
    let data = {};
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") {
        data[key] = obj[key]
      }
    }
    return data;
  }

}
