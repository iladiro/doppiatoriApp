import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Models 
import { User } from '../_models/index';

@Injectable()
export class UserService {

  private urlRoot = "http://localhost:2000/users";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.urlRoot);
  }

  getById(id: number) {
    return this.http.get(this.urlRoot + "?id=eq." + id, {headers: {'Accept': 'application/vnd.pgrst.object+json'}});
  }

  create(user: User) {
    return this.http.post(this.urlRoot, user);
  }

  update(user: User) {
    return this.http.put(this.urlRoot + "?id=eq." + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(this.urlRoot + "?id=eq." + id);
  }
}
