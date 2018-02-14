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
    this.http.post(this.urlRoot, invoice).subscribe(
      data => {
        this.invoicesList.push(data);
      }
    );
  };

  delete(invoice) {
    let index = this.invoicesList.indexOf(invoice);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.http.delete(this.urlRoot + invoice.id.toString()).subscribe(
        data => {
          this.invoicesList.splice(index, 1);
        }
      )
    }
  };

  update(invoice) {
    this.http.put(this.urlRoot + invoice.id.toString(), invoice).subscribe(
      data => {}
    );
    // var confirmRequest = confirm("Are you sure you wanna run the following changes?");
    // if (confirmRequest == true) {
    //   this.http.put(this.urlRoot + invoice.id.toString(), invoice).subscribe(
    //     data => {}
    //   );
    // };
  };

}
