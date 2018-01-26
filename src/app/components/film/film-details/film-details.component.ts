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

  deleteDubber(idFilm, idDubber) {
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
    this.filmService.update(obj);
  }

  addDubberHasParticipated(form: NgForm) {
    let filmRefacted;
    let idFilm = this.id;
    let currentDubber = form.value;
    let dubberData = currentDubber.dubbers.split(",");
    let objDubber = {
    	id: dubberData[0],
    	name: dubberData[1]
    };
    let present = false;
    this.filmService.filmsList.forEach(function(film) {
      if(film.id == idFilm) {
        film.dubbers.map(function(dubber) {
          if(dubber.id == objDubber.id) {
            present = true;
            alert("Dubber is already present");
          } else {
            film.dubbers.push(objDubber);
            filmRefacted = film;
            return;
          }
        });
      };
      //return filmRefacted;
      console.log(filmRefacted);
    };
    // if(present == false) {
    //   this.filmService.update(filmRefact);
    // };
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(this.id);
    });
    this.dubberService.getAll();
    this.filmService.getAll();
  }

}
