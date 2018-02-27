import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Film } from '../_models/index';
import { FilmService } from '../_services/index';
import { DubberService } from '../../dubber/_services/dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})

export class FilmDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  private upDateFilm(){
    this.filmService.update(this.model).subscribe();
  }

  private deleteDubber(idDubber) {
    let currentFilm = this.model;
    currentFilm.dubbers.map(function(dubber, index){
      if(dubber.id == idDubber) {
        currentFilm.dubbers.splice(index, 1);
      }
    });
    this.filmService.update(this.model).subscribe();


    //Updating dubber object after event delete film
    let idCurrentFilm = this.id;
    let dubberObject;
    this.dubberService.dubbersList.map(function(dubber) {
      if(dubber.id == idDubber) {
        dubber.film.map(function(film, index) {
          if(film.id == idCurrentFilm) {
            dubber.film.splice(index, 1)
          }
        })
        dubberObject = dubber;
      };
    });
    this.dubberService.update(dubberObject);
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
    //end
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(this.id).subscribe(film => { this.model = film; });
    });
    this.dubberService.getAll();
    this.filmService.getAll();
  }

}
