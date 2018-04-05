import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
  baseUrl: string = 'http://localhost:3000/';
  queryUrl: string = '?';

  constructor(private http: HttpClient) { }

  search(dataForRequest, terms: Observable<string>) {
    this.baseUrl += dataForRequest.table;
    this.queryUrl += dataForRequest.parameter + "=ilike.%";
    //console.log(this.queryUrl);
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http.get(this.baseUrl + this.queryUrl + term + "%");
  }

  getAll() {
    return this.http.get(this.baseUrl);
  }
}
