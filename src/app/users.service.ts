import { Injectable } from '@angular/core';
import { UserModel } from './user-model';

@Injectable();

export class UserService {

  private usersList: UserModel[];

  constructor() {
    this.usersList = [
      {
        name: "Ilaria"
        // surname: "Di Rosa"
      },
      {
        name: "Fabio"
        // surname: "Petrucci"
      },
      {
        name: "Marika"
        // surname: "Di Rosa"
      },
      {
        name: "Adele"
        // surname: "Simone"
      },
      {
        name: "Carmelo"
        // surname: "Di Rosa"
      }
    ]
  };

  getUser(): UserModel[] {
    return this.usersList;
  };

  addUser(user) {
    this.usersList.push(user)
  };

}
