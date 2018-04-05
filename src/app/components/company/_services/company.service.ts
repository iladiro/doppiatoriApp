import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../_models/index';

@Injectable()
export class CompanyService {

  private urlRoot = "http://localhost:3000/companies";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Company[]>(this.urlRoot);
  }

  getById(id: number) {
    return this.http.get(this.urlRoot + "?id=eq." + id, {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  create(company: Company) {
    return this.http.post(this.urlRoot, company);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + "?id=eq." + id);
  }

  update(company: Company) {
    return this.http.put(this.urlRoot + company.id, company);
  }

}
