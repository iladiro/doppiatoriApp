import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()

export class EnpalsPaymentsService {

  private url_root = "http://localhost:3000/enpals_payments";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getFromDate(date_from, date_to) {
    return this.http.get(this.url_root + "?data_payments=gte." + date_from + "&" + "data_payments=lte." + date_to);
  }

}
