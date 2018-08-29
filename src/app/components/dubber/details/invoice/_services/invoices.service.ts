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
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,film:films(title),dubber:dubbers(gender,name,surname,birth_place,birth_date,vat,fiscal_code, address: addresses(home_address, home_postcode, home_city, residence_address, residence_postcode, residence_city), enpals_cat: enpals_categories(matricola_enpals,cat_contrib,iscrizione_sindacato,pensionato,ritenuta_acconto,trattenuta_sindacale,forfettone)),company:companies(*),enpals_data:dubber_enpals_data(*)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

}
