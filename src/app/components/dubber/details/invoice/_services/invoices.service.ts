import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Models
import { Invoice } from '../_models/index';

@Injectable()

export class InvoiceService {

  private url_root = "http://localhost:2000/invoices";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,dubber:dubbers(name,surname,birth_place,birth_date,vat,fiscal_code),company:companies(*),enpals_data:dubber_enpals_data(*)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

}
