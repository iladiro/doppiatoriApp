import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ResidenceAddressService {

  private url_root = "http://localhost:3000/residence_addresses";

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // create(bank) {
  //   return this.http.post(this.url_root, bank);
  // }

  delete(id: number) {
    return this.http.delete(this.url_root + "?id=eq." + id);
  }

  update(address) {
    return this.http.patch(this.url_root + "?id=eq." + address.id, address);
  }

  setAsDefault(address_id, set) {
    return this.http.patch(this.url_root + "?id=eq." + address_id, set);
  }

  resetDefault(dubber_id, reset) {
    return this.http.patch(this.url_root + "?dubber_id=eq." + dubber_id + "&_default=is." + true, reset);
  }

}
