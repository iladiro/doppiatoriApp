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

  constructor( private route: ActivatedRoute, private filmService: FilmService, private dubberService: DubberService ) {}

  upDateFilm(form: NgForm){
    let currentFilm = form.value;
    currentFilm.id = this.id;
    currentFilm.dubbers = this.filmService.film.dubbers;
    this.filmService.update(currentFilm);
  }

  deleteDubber(idDubber) {
    let currentFilm = this.filmService.film;
    currentFilm.dubbers.map(function(dubber, index){
      if(dubber.id == idDubber) {
        currentFilm.dubbers.splice(index, 1);
      }
    });
    this.filmService.update(currentFilm);

    // Updating film object after event delete film
    let dubberToDelete;
    this.dubberService.dubbersList.map(function(dubber, index) {
      if(dubber.id == idDubber) {
        dubber.film.splice(index, 1);
        dubberToDelete = dubber;
      };
    });
    this.filmService.update(dubberToDelete);
    // end
  }

  addDubberHasParticipated(form: NgForm) {
    // Create dubber object to add
    let dubberToAdd = form.value;
    dubberToAdd = dubberToAdd.dubbers.split(",");
    dubberToAdd = {
    	"id": dubberToAdd[0],
    	"name": dubberToAdd[1]
    };
    // end
    // Film object that we've got from the service, and then we've  extrapolated ID and title
    let currentFilm = this.filmService.film;
    let objFilm = {
      "id": this.id,
      "title": this.filmService.film.title
    };
    // end

    /*Create an array of dubber's id.
    Then check if the id of the dubber that I want to add is present or not into the array of id*/
    let dubbersID = [];
    currentFilm.dubbers.map(function(dubber) {
      dubbersID.push(dubber.id);
    });
    if(dubbersID.includes(dubberToAdd.id)) {
      alert("Dubber is already present");
    } else {
      currentFilm.dubbers.push(dubberToAdd);
      this.filmService.update(currentFilm);
    }
    //end

    /* Each every dubbers in the app. Then check if the id of the dubber on the
    cicle is equal then id of the dubber that I wanna add.
    If YES get a push of the film's data into the dubber object*/
    this.dubberService.dubbersList.map(function(dubber) {
      if(dubber.id == dubberToAdd.id) {
        dubber.film.push(objFilm);
        dubberToAdd = dubber;
      };
    });
    this.dubberService.update(dubberToAdd);
    // end
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
