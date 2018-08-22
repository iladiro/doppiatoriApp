import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import {Observable} from 'rxjs';

@Injectable()

export class ContractService {

  private url_root = "http://localhost:3000/contracts";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,dubber:dubbers(name, surname),films:films(title)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

}
