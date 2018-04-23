import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

// Models
import { Qualification } from '../_models/index';

@Injectable()
export class QualificationService {

  private url_root = "http://localhost:3000/qualifications";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Qualification[]>(this.url_root);
  }

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id, {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  create(qualification: Qualification): Observable<HttpResponse<any>> {
    return this.http.post(this.url_root, qualification, { observe: 'response' });
  }

  delete(id: number) {
    return this.http.delete(this.url_root + "?id=eq." + id);
  }

  update(qualification: Qualification) {
    return this.http.patch(this.url_root + "?id=eq." + qualification.id, qualification);
  }

  ngOnInit(): void {}

}
