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
    let dubbersList = this.filmService.film.dubbers;
    dubbersList.map(function(dubber, index){
      if(dubber.id == idDubber) {
        dubbersList.splice(index, 1);
      }
    });
    let obj = {
      "id": this.id,
      "title": this.filmService.film.title,
      "description": this.filmService.film.description,
      "dubbers": dubbersList
    };
    this.filmService.update(obj);
  }

  addDubberHasParticipated(form: NgForm) {
    let dubbersID = [];
    let dubbersList = this.filmService.film.dubbers;
    let currentDubber = form.value;
    //Create dubber object
    let dubberData = currentDubber.dubbers.split(",");
    let objDubber = {
    	id: dubberData[0],
    	name: dubberData[1]
    };
    //end
    //Create an array of dubber's id
    dubbersList.map(function(dubber) {
      dubbersID.push(dubber.id);
    }
    //end
    if(dubbersID.includes(objDubber.id, 1)) {
      alert("Dubber is already present");
    } else {
      // Pusha, ricrea oggetto e aggiorna
      dubbersList.push(objDubber);
      let obj = {
        "id": this.id,
        "title": this.filmService.film.title,
        "description": this.filmService.film.description,
        "dubbers": dubbersList
      };
      this.filmService.update(obj);
    }
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
