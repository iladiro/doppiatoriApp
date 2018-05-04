import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AddressService {

  private url_root = "http://localhost:3000/addresses";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  create(address) {
    return this.http.post(this.url_root, address);
  }

  delete(id: number) {
    return this.http.delete(this.url_root + "?id=eq." + id);
  }

  update(address) {
    return this.http.patch(this.url_root + "?id=eq." + address.id, address);
  }

}
