import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()

export class Service {

  private url_root = "http://localhost:3000/";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll(table) {
    return this.http.get(this.url_root + table);
  }

  // getById(table, id: number) {
  //   return this.http.get(this.url_root + table + "?id=eq." + id + "&select=*,addresses:addresses(*),banks:banks(*),films:films(id,title),invoices:invoices(*)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  // }

  create(table, item): Observable<HttpResponse<any>> {
    return this.http.post(this.url_root + table, item, { observe: 'response' });
  }

  delete(table, column, id: number) {
    return this.http.delete(this.url_root + table + "?" + column + "=eq." + id);
  }

  update(table, item) {
    return this.http.patch(this.url_root + table + "?id=eq." + item.id, item);
  }

  // setAsDefault(table, item_id, set) {
  //   return this.http.patch(this.url_root + table + "?id=eq." + item_id, set);
  // }
  //
  // resetDefault(table, item_id, reset) {
  //   return this.http.patch(this.url_root + table + "?dubber_id=eq." + item_id + "&_default=is." + true, reset);
  // }

}
