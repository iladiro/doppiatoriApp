import { Injectable, Inject } from "@angular/core";

// Services
import { Service } from '../services/index';

@Injectable()
export class LoadAllItems {

  items_list: any = [];

  constructor(
    private service: Service
  ) {}

  get(table, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this.items_list = data;
      },
      err => {}
    );
  }

}
