import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Models
import { Dubber } from '../_models/index';

@Injectable()

export class DubberService {

  private url_root = "http://localhost:3000/dubbers";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Dubber[]>(this.url_root);
  }

  getById(id: number) {
    return this.http.get(this.url_root + id);
  }

  create(dubber: Dubber) {
    return this.http.post(this.url_root, dubber);
  }

  delete(id: number) {
    return this.http.delete(this.url_root + id);
  }

  update(dubber: Dubber) {
    return this.http.put(this.url_root + dubber.id, dubber);
  }

}
