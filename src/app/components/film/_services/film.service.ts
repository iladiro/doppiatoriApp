import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Film } from '../_models/index';

@Injectable()
export class FilmService {

  private urlRoot = "http://localhost:3000/film/";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Film[]>(this.urlRoot);
  }

  getById(id: number) {
    return this.http.get(this.urlRoot + id);
  }

  create(film: Film) {
    return this.http.post(this.urlRoot, film);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + id);
  }

  update(film: Film) {
    return this.http.put(this.urlRoot + film.id, film);
  }

}
