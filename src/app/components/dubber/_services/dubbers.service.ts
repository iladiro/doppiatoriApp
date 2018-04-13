import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Models
import { Dubber } from '../_models/index';

@Injectable()

export class DubberService {

  private url_root = "http://localhost:3000/dubbers";
  private url_relation_table = "http://localhost:3000/dubbers_films";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Dubber[]>(this.url_root);
  }

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=*,films:films(id,title)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  create(dubber: Dubber) {
    return this.http.post(this.url_root, dubber);
  }

  delete(id: number) {
    return this.http.delete(this.url_root + "?id=eq." + id);
  }

  update(dubber: Dubber) {
    console.log(dubber);
    return this.http.patch(this.url_root + "?id=eq." + dubber.id, dubber);
  }

  /*-------------------------------------------------------------------------*/

  deleteFilmDubber(film_id: number, dubber_id: number) {
    return this.http.delete(this.url_relation_table + "?film_id=eq." + film_id + "&dubber_id=eq." + dubber_id);
  }

  deleteDubberFromReationTable(dubber_id: number) {
    return this.http.delete(this.url_relation_table + "?dubber_id=eq." + dubber_id);
  }
}
