import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
// import 'rxjs/Rx';

// Models
import { Film } from '../_models/index';

@Injectable()
export class FilmService {

  //headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  private urlRoot = "http://localhost:3000/films";
  private urlRelationTable = "http://localhost:3000/dubbers_films";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Film[]>(this.urlRoot);
  }

  getById(id: number) {
    return this.http.get(this.urlRoot + "?id=eq." + id + "&select=title,description,dubbers:dubbers(id,name)", {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  getByIdFilmDubbers(id: number) {
    return this.http.get(this.urlRelationTable + "?film_id=eq." + id);
  }

  create(film: Film): Observable<HttpResponse<any>> {
    return this.http.post(this.urlRoot, film, { observe: 'response' });
  }

  createFilmDubbers(filmDubbers) {
    return this.http.post(this.urlRelationTable, filmDubbers);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + "?id=eq." + id);
  }

  update(film: Film) {
    return this.http.patch(this.urlRoot + "?id=eq." + film.id, film);
  }

}
