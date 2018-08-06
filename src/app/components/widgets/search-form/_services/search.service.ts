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
    /*
    Ogni volta che entro in questa funzione ( quindi a ogni keyup), devo resettare
    query_url e base_url perchè ogni volta che entra a base_url aggiunge il nome della tabella
    passata quindi se non elimini la stringa della tabella passata la riaggiunege
    nuovamente, ottenendo la seguente stringa: "http://localhost:3000/dubbersdubbers"
    */
    this.query_url = "?";
    this.base_url = 'http://localhost:3000/';
    // end
    if(value != "") {
      this.base_url += dataForRequest.table;
      let params = dataForRequest.parameters;
      let array_params = [];
      params.map(function(par) {
        let string = par + ".ilike.*" + value + "*";
        array_params.push(string);
      });
      this.query_url += "or=(" + array_params.join(",") + ")";
      let url = this.base_url + this.query_url;
      let results = this.sendSearch(url);
      console.log(url);
      return results
    } else {
      let results = this.getAll();
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
