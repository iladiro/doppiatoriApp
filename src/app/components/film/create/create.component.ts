import { Component } from '@angular/core';

// Models
import { Film } from '../_models/index';

// Services
import { Service } from '../../../services/index';

@Component({
  moduleId: module.id,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class AddFilmComponent {

  film: any = {};

  private alert_message;

  constructor(
    private service: Service
  ) {}

  create(form){
    this.service.create("films", form.value).subscribe(
      data => {
        this.alert_message = "success";
      },
      err => {
        console.log(err);
        this.alert_message = "rejected";
      }
    )
  }

  ngOnInit() {}

}
