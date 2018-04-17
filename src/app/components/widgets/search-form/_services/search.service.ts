import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  base_url: string = 'http://localhost:3000/';
  query_url: string = '?';
  table: string = "";

  constructor(private http: HttpClient) { }

  buildUrl(dataForRequest, value) {
    this.table = dataForRequest.table;
    this.query_url = "?";
    this.base_url = 'http://localhost:3000/';
    if(value != "") {
      this.base_url += dataForRequest.table;
      let params = dataForRequest.parameters;
      let array_params = [];
      params.map(function(par) {
        let string = par + ".ilike.%" + value + "%";
        array_params.push(string);
      });
      this.query_url += "or=(" + array_params.join(",") + ")";
      let url = this.base_url + this.query_url;
      let results = this.sendSearch(url);
      return results
    } else {
      let results = this.getAll()
      return results
    }
  }

  private sendSearch(url) {
    return this.http.get(url);
  }

  private getAll() {
    return this.http.get(this.base_url + this.table);
  }
}
