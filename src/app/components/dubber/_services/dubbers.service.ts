import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

// Models
import { Dubber } from '../_models/index';

@Injectable()

export class DubberService {

  private url_root = "http://localhost:2000/dubbers";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,addresses:addresses(*),banks:banks(*),films:films(id,title),invoices:invoices(*),enpals_categories:enpals_categories(*)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

}
