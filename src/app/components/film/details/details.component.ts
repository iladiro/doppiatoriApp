import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Film } from '../_models/index';

// Services
import { Service } from '../../../services/index';
import { FilmService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class FilmDetailsComponent implements OnInit {

  private film: Film;
  private dubbers: any = [];

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private filmService: FilmService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(id).subscribe(
        data => {
          let film_info = data[0];
          this.film = {
            "id": film_info.film_id,
            "title": film_info.title,
            "description": film_info.description
          };
          this.dubbers = data;
        },
        err => {
          console.log(err)
        }
      );
    });
  }

}
