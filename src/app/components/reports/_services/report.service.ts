import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()

export class ReportService {

  private url_root = "http://localhost:3000/";

  // Inject HttpClient into your component or service.
  constructor(
    private http: HttpClient
  ) {}

  getdata(table, query) {
    return this.http.get<any[]>(this.url_root + table + "?" + query);
  }

}
