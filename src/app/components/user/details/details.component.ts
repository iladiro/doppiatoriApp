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
  private message = {
    "alert": {
      "status": false,
      "text": "",
      "class": ""
    },
    "modal": {
      "text": "",
      "response": ""
    }
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  private upDate() {
    this.loading = true;
    this.userService.update(this.model).subscribe(
      data => {
        this.message.alert.text = "User has been updated successfully!";
        this.message.alert.class = "success";
        this.message.alert.status = true;
        this.loading = false;
      },
      err => {
        this.message.alert.text = "Error occured!";
        this.message.alert.class = "danger";
        this.message.alert.status = true;
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
