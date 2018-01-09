import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class AccountService {

  private accountsList;
  private account;

  constructor(private http: HttpClient) { }

  getAccounts() {
    this.http.get('http://localhost:3000/accounts').subscribe(
      data => {
        this.accountsList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getAccount(idAccount) {
    this.http.get('http://localhost:3000/accounts/' + idAccount.toString()).subscribe(
      data => {
        this.account = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  addAccount(account) {
    this.http.post('http://localhost:3000/accounts', account).subscribe(
      data => {
        this.accountsList.push(data);
      }
    );
  };

  deleteAccount(account) {
    let index = this.accountsList.indexOf(account);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.http.delete('http://localhost:3000/accounts/' + account.id.toString()).subscribe(
        data => {
          this.accountsList.splice(index, 1);
        }
      )
    }
  };

  updateAccount(account) {
    var confirmRequest = confirm("Are you sure you wanna run the following changes?");
    if (confirmRequest == true) {
      this.http.put('http://localhost:3000/accounts/' + account.id.toString(), account).subscribe(
        data => {}
      );
    };
  };

}
