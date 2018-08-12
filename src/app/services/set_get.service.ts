import { Injectable } from '@angular/core';

@Injectable()

export class SetGetService {

  public data:any;

  constructor() {}

  set(data) {
    this.data = data;
  }

  get() {
    return this.data
  }

  ngOnInit(): void {}

}
