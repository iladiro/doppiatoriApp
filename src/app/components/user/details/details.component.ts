import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { User } from '../_models/index';

// Services
import { UserService } from '../_services/index';

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

  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  private upDate() {
    this.loading = true;
    this.userService.update(this.model).subscribe(
      data => {
        this.alert_message = {
          "text": "User has been updated successfully!",
          "class": "success",
          "display": true
        }
        this.loading = false;
      },
      err => {
        this.alert_message = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
        this.loading = false;
      }
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.userService.getById(this.id).subscribe(
        data => {
          this.model = data;
        }
      );
    });
  }

}
