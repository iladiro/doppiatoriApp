import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';

// Models
import { Film } from '../_models/index';

@Injectable()
export class FilmService {

  //headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  private url_root = "http://localhost:3000/films";
  private url_relation_table = "http://localhost:3000/dubbers_films";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Film[]>(this.url_root);
  }

  getById(id: number) {
    return this.http.get(this.url_root + "?id=eq." + id + "&select=title,description,dubbers:dubbers(id,name)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  create(film: Film): Observable<HttpResponse<any>> {
    return this.http.post(this.url_root, film, { observe: 'response' });
  }

  delete(id: number) {
    return this.http.delete(this.url_root + "?id=eq." + id);
  }

  update(film: Film) {
    return this.http.patch(this.url_root + "?id=eq." + film.id, film);
  }

  /*--------------------------------------------------------------------------*/

  createFilmDubbers(dubbers_films) {
    console.log(dubbers_films);
    return this.http.post(this.url_relation_table, dubbers_films);
  }

  getByIdFilmDubbers(id: number) {
    return this.http.get(this.url_relation_table + "?film_id=eq." + id);
  }

  deleteFilmDubber(film_id: number, dubber_id: number) {
    return this.http.delete(this.url_relation_table + "?film_id=eq." + film_id + "&dubber_id=eq." + dubber_id);
  }

  deleteFilmFromReationTable(film_id: number) {
    return this.http.delete(this.url_relation_table + "?film_id=eq." + film_id);
  }

}
