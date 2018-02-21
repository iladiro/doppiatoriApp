import { Component, OnInit } from '@angular/core';
import { User } from '../user/_models/index';
//import { UserService } from '../user/_services/index';
import { DubberService } from '../dubber/dubbers.service';
import { FilmService } from '../film/film.service';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  currentUser: User;
  //users: User[] = [];

  constructor(
    //private userService: UserService,
    private filmService: FilmService,
    private dubberService: DubberService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    //this.loadAllUsers();
    this.filmService.getAll();
    this.dubberService.getAll();
  }

  // deleteUser(id: number) {
  //   this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  // }
  //
  // private loadAllUsers() {
  //   this.userService.getAll().subscribe(users => { this.users = users; });
  // }
}
