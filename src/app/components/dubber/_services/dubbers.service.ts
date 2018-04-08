import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Models
import { Dubber } from '../_models/index';

@Injectable()

export class DubberService {

  private urlRoot = "http://localhost:3000/dubbers";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    return this.http.get<Dubber[]>(this.urlRoot);
  }

  getById(id: number) {
    return this.http.get(this.urlRoot + id);
  }

  create(dubber: Dubber) {
    return this.http.post(this.urlRoot, dubber);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + id);
  }

  update(dubber: Dubber) {
    return this.http.put(this.urlRoot + dubber.id, dubber);
  }

}
