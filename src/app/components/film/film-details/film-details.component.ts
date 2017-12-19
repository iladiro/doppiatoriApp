import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';

@Component({
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss'],
  providers: [FilmService]
})

export class FilmDetailsComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private filmService: FilmService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      //console.log("l'id è " + this.id);
      this.filmService.getFilm(this.id);
    });
  }

}
