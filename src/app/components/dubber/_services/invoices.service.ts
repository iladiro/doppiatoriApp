import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Models
import { Invoice } from '../_models/index';

@Injectable()

export class InvoiceService {

  private urlRoot = "http://localhost:3000/invoices/";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Invoice[]>(this.urlRoot);
  }

  getById(id: number) {
    return this.http.get(this.urlRoot + id);
  }

  create(invoice) {
    return this.http.post(this.urlRoot, invoice);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + id);
  }

  update(invoice) {
    return this.http.put(this.urlRoot + invoice.id, invoice);
  }

}
