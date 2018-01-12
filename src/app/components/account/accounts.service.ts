import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class AccountService {

  private urlRoot = "http://localhost:3000/accounts";
  private accountsList;
  private account;

  constructor(private http: HttpClient) { }

  getAll() {
    this.http.get(this.urlRoot).subscribe(
      data => {
        this.accountsList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getById(idAccount) {
    this.http.get(this.urlRoot + idAccount.toString()).subscribe(
      data => {
        this.account = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  create(account) {
    this.http.post(this.urlRoot, account).subscribe(
      data => {
        this.accountsList.push(data);
      }
    );
  };

  delete(account) {
    let index = this.accountsList.indexOf(account);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.http.delete(this.urlRoot + account.id.toString()).subscribe(
        data => {
          this.accountsList.splice(index, 1);
        }
      )
    }
  };

  update(account) {
    var confirmRequest = confirm("Are you sure you wanna run the following changes?");
    if (confirmRequest == true) {
      this.http.put(this.urlRoot + account.id.toString(), account).subscribe(
        data => {}
      );
    };
  };

}
