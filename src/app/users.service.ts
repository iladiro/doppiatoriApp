import { Injectable } from '@angular/core';
import { UserModel } from './user-model';

@Injectable()

export class UserService {

  private usersList: UserModel[];

  constructor() {
    this.usersList = [
      {
        id: 1,
        name: "Ilaria",
        surname: "Di Rosa"
      },
      {
        id: 2,
        name: "Fabio",
        surname: "Petrucci"
      },
      {
        id: 3,
        name: "Marika",
        surname: "Di Rosa"
      },
      {
        id: 4,
        name: "Adele",
        surname: "Simone"
      },
      {
        id: 5,
        name: "Carmelo",
        surname: "Di Rosa"
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
