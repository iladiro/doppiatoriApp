import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';
import { UserService } from '../users.service';

@Component({
  // selector: 'router-outlet',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService]
})
export class UsersListComponent implements OnInit {

  @Input() usersList: UserModel[];

  constructor(private userService: UserService) {
    this.usersList = this.userService.getUser();
  }

  addUser(name, surname) {
    if (name && surname) {
      let lengthUsersIndex = Math.floor((Math.random() * 1000000) + 1);;
      this.usersList.push({
        id: lengthUsersIndex,
        name: name,
        surname: surname
      });
      console.log(this.usersList);
    }
  };

  deleteUser(user) {
    /*dell'oggetto che restituisco (user) va a fare il match con l'array di oggetti (users) e mi restituisce
    l'indice della posizione dell'oggetto corrispondente nell'array.*/
    let index = this.usersList.indexOf(user);
    this.usersList.splice(index, 1);
  };

  ngOnInit() {}

}
