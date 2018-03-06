import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class InvoiceService {

  private urlRoot = "http://localhost:3000/invoices/";
  invoicesList;
  invoice;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {
    this.invoicesList = []
  }

  ngOnInit(): void {}

  getAll() {
    this.http.get(this.urlRoot).subscribe(
      data => {
        this.invoicesList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getById(idInvoice) {
    this.http.get(this.urlRoot + idInvoice.toString()).subscribe(
      data => {
        this.invoice = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  create(invoice) {
    return this.http.post(this.urlRoot, invoice);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + id);
  }

  update(invoice) {
    this.http.put(this.urlRoot + invoice.id.toString(), invoice).subscribe(
      data => {}
    );
  };

}
