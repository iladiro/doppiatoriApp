import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()

export class Service {

  private url_root = "http://localhost:2000/";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll(table, condition) {
    if(condition == "all") {
      return this.http.get(this.url_root + table);
    } else if(condition == "archived") {
      return this.http.get(this.url_root + table + "?" + "&archived=" + "is.true");
    } else if(condition == "not_archived") {
      return this.http.get(this.url_root + table + "?" + "&archived=" + "is.false");
    } else if(condition == "default") {
      return this.http.get(this.url_root + table + "?" + "&_default=" + "is.true", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
    }
  }

  create(table, item): Observable<HttpResponse<any>> {
    return this.http.post(this.url_root + table, item, { observe: 'response' });
  }

  delete(table, column, id: number) {
    return this.http.delete(this.url_root + table + "?" + column + "=eq." + id);
  }

  archived(table, id: number, set) {
    return this.http.patch(this.url_root + table + "?id=eq." + id, set);
  }

  update(table, item) {
    return this.http.patch(this.url_root + table + "?id=eq." + item.id, item);
  }

  getById(table, column, id: number) {
    return this.http.get(this.url_root + table + "?" + column + "=eq." + id, {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  getManyById(table, column, id: number) {
    return this.http.get(this.url_root + table + "?" + column + "=eq." + id);
  }

  setAsDefault(table, item_id, set) {
    return this.http.patch(this.url_root + table + "?id=eq." + item_id, set);
  }

  resetDefault(table, item_id, reset) {
    return this.http.patch(this.url_root + table + "?dubber_id=eq." + item_id + "&_default=is." + true, reset);
  }

  deleteFilmDubber(table, film_id: number, dubber_id: number) {
    return this.http.delete(this.url_root + table + "?film_id=eq." + film_id + "&dubber_id=eq." + dubber_id);
  }

}
