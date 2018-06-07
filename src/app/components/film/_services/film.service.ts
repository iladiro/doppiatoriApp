import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

// Models
import { Film } from '../_models/index';

@Injectable()
export class FilmService {

  //headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  private url_root = "http://localhost:2000/films";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,dubbers:dubbers(id,name,surname)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

}
