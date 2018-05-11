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

  id: number;
  private sub: any;
  film: any;

  private alert_message;

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private filmService: FilmService
  ) {}

  setMessage(message){
    this.alert_message = message;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(this.id).subscribe(
        data => {
          this.film = data;
        }
      );
    });
  }

}
