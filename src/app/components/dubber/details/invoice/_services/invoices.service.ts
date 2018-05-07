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

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,dubber:dubbers(*),company:companies(*)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

}
