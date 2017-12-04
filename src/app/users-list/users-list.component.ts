import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from '../user-model';
import { UserService } from '../users.service';
import {NgForm} from '@angular/forms';

@Component({
  // selector: 'router-outlet',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UserService]
})

export class UsersListComponent implements OnInit {

  @Input() usersList: UserModel[];

  user: UserModel{};

  constructor(private userService: UserService) {
    this.usersList = this.userService.getUsers();
  }

  onSubmit(form: NgForm){
    let currentUser = form.value;
    let lengthUsersIndex = Math.floor((Math.random() * 1000000) + 1);
    this.user = {
      id: lengthUsersIndex,
      name: currentUser.name,
      surname: currentUser.surname,
      age: currentUser.age,
      gender: currentUser.gender,
      nationality: currentUser.nationality,
      photo: currentUser.photo
    };
    this.usersList = this.userService.addUser(this.user);
    this.usersList = this.userService.getUsers();
  }

  onDelete(user) {
    this.usersList = this.userService.deleteUser(user);
    this.usersList = this.userService.getUsers();
  }

  // deleteUser(user) {
  //   /*dell'oggetto che restituisco (user) va a fare il match con l'array di oggetti (users) e mi restituisce
  //   l'indice della posizione dell'oggetto corrispondente nell'array.*/
  //   let index = this.usersList.indexOf(user);
  //   this.usersList.splice(index, 1);
  // }

  ngOnInit() {}

}
