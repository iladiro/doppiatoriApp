import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Models
import { Invoice } from '../_models/index';

@Injectable()

export class InvoiceService {

  private url_root = "http://localhost:3000/invoices";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // getAll() {
  //   return this.http.get<Invoice[]>(this.url_root);
  // }

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,dubber:dubbers(*),company:companies(*)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  // create(invoice: Invoice) {
  //   return this.http.post(this.url_root, invoice);
  // }
  //
  // delete(id: number) {
  //   return this.http.delete(this.url_root + "?id=eq." + id);
  // }
  //
  // update(invoice) {
  //   return this.http.put(this.url_root + invoice.id, invoice);
  // }

}
