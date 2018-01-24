import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FilmModel } from '../film-model';
import { FilmService } from '../film.service';
import { DubberService } from '../../dubber/dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})

export class FilmDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  currentFilm;

  constructor( private route: ActivatedRoute, private filmService: FilmService, private dubberService: DubberService ) {}

  upDateFilmDate(form: NgForm){
    this.currentFilm = form.value;
    this.currentFilm.id = this.id;
    this.filmService.update(this.currentFilm);
  }

  onDelete(idFilm, idDubber) {
    let obj;
    let dubbersList;
    this.filmService.filmsList.forEach(function(film) {
      if(film.id == idFilm) {
        dubbersList = film.dubbers;
        dubbersList.map(function(dubber, index){
          if(dubber.id == idDubber) {
            dubbersList.splice(index, 1);
            obj = {
              "id": film.id,
              "title": film.title,
              "description": film.description,
              "dubbers": dubbersList
            };
          }
        });
      }
      return obj;
    });
    console.log(obj);
    this.filmService.update(obj);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      //console.log("l'id è " + this.id);
      this.filmService.getById(this.id);
    });
    this.dubberService.getAll();
    this.filmService.getAll();
  }

}
