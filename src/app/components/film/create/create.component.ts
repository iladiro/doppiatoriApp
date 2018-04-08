import { Component } from '@angular/core';
import { Response } from "@angular/http";

// Models
import { Film } from '../_models/index';
import { Dubber } from '../../dubber/_models/index';

// Services
import { FilmService } from '../_services/index';
import { DubberService } from '../../dubber/_services/dubbers.service';

@Component({
  moduleId: module.id,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class AddFilmComponent {

  film: any = {};
  id: string = "";
  //loading = false;

  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  dubbers: Dubber[] = [];

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  create(){
    delete this.film.dubbers;
    //Send object film to server
    this.filmService.create(this.film)
      // resp is of type `HttpResponse<Config>`
    .subscribe(
      resp => {
        let str = resp.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.id = result[0];
        this.alertMessage = {
          "text": "Film has been created successfully!",
          "class": "success",
          "display": true
        }
      }
      err => {
        this.alertMessage = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
      }
    );
  }

  ngOnInit() {
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

}
