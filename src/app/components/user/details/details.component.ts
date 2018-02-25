import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
import { User } from '../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsUserComponent implements OnInit {

  id: number;
  private sub: any;
  model: any = {};
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  private upDateUser(form: NgForm) {
    let currentUser = form.value;
    currentUser.id = this.id;
    console.log(currentUser);
    this.loading = true;
    this.userService.update(currentUser).subscribe();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.userService.getById(this.id).subscribe(user => { this.model = user; });
    });
  }

}
