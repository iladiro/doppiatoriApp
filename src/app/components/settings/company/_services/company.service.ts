import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models
import { Company } from '../_models/index';

@Injectable()
export class CompanyService {

  private url_root = "http://localhost:3000/companies";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // getAll() {
  //   return this.http.get<Company[]>(this.url_root);
  // }

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id, {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  // create(company: Company) {
  //   return this.http.post(this.url_root, company);
  // }
  //
  // delete(id: number) {
  //   return this.http.delete(this.url_root + "?id=eq." + id);
  // }
  //
  // update(company: Company) {
  //   return this.http.patch(this.url_root + "?id=eq." + company.id, company);
  // }

}
