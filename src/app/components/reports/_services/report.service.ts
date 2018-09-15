import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()

export class ReportService {

  private url_root = "http://localhost:3000/contracts";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  getFilmsListFromYear(ref_year) {
    return this.http.get(this.url_root + "?reference_year=eq." + ref_year + "&select=film_id, film_title");
  }

  getCostFilm(film_id, ref_year) {
    return this.http.get(this.url_root + "?film_id=eq." + film_id + "&reference_year=eq." + ref_year + "&select=amount,dubber_enpals_data:dubber_enpals_data(total_enpals)");
  }

  getMonthlyCostFilm(ref_month, ref_year) {
    return this.http.get(this.url_root + "?" + "reference_month=eq." + ref_month + "&reference_year=eq." + ref_year + "&select=title:film_title,amount_enpals:dubber_enpals_data(total_enpals)");
  }

}
