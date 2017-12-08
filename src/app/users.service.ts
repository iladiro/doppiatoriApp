import { Injectable } from '@angular/core';
import { UserModel } from './user-model';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class UserService {

  private usersList: UserModel[];

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getUsers(): UserModel[] {
    this.http.get('http://localhost:3000/users').subscribe(
      data => {
        this.usersList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  addUser(user) {
    this.http.post('http://localhost:3000/users', user).subscribe(
      data => {
        console.log(data);
        this.usersList.push(data);
      }
    );
  };

  deleteUser(user) {
    let index = this.usersList.indexOf(user);
    this.usersList.splice(index, 1);
    // console.log("users " + JSON.stringify(this.usersList));
  };

}
