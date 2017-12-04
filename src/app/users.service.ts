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
        surname: "Di Rosa",
        photo: "http://d33wubrfki0l68.cloudfront.net/73a9e018a16a93b4e19a20db44fbb7cefec939d3/35d92/assets/images/me.jpg",
        nationality: "Italian",
        gender: "Female",
        age: 30
      },
      {
        id: 2,
        name: "Fabio",
        surname: "Petrucci",
        photo: "http://d33wubrfki0l68.cloudfront.net/73a9e018a16a93b4e19a20db44fbb7cefec939d3/35d92/assets/images/me.jpg",
        nationality: "Italian",
        gender: "Male",
        age: 46
      },
      {
        id: 3,
        name: "Marika",
        surname: "Di Rosa",
        photo: "http://d33wubrfki0l68.cloudfront.net/73a9e018a16a93b4e19a20db44fbb7cefec939d3/35d92/assets/images/me.jpg",
        nationality: "Italian",
        gender: "Female",
        age: 30
      },
      {
        id: 4,
        name: "Adele",
        surname: "Simone",
        photo: "http://d33wubrfki0l68.cloudfront.net/73a9e018a16a93b4e19a20db44fbb7cefec939d3/35d92/assets/images/me.jpg",
        nationality: "Italian",
        gender: "Female",
        age: 57
      },
      {
        id: 5,
        name: "Carmelo",
        surname: "Di Rosa",
        photo: "http://d33wubrfki0l68.cloudfront.net/73a9e018a16a93b4e19a20db44fbb7cefec939d3/35d92/assets/images/me.jpg",
        nationality: "Italian",
        gender: "Male",
        age: 61
      }
    ]
  };

  getUsers(): UserModel[] {
    return this.usersList;
  };

  addUser(user) {
    this.usersList.push(user);
    // console.log("users " + JSON.stringify(this.usersList));
  };

  deleteUser(user) {
    let index = this.usersList.indexOf(user);
    this.usersList.splice(index, 1);
  };

}
