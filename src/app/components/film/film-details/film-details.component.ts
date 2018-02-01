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

  upDateFilm(form: NgForm){
    this.currentFilm = form.value;
    this.currentFilm.id = this.id;
    this.currentFilm.dubbers = this.filmService.film.dubbers;
    this.filmService.update(this.currentFilm);
  }

  deleteDubber(idDubber) {
    let currentFilm = this.filmService.film;
    currentFilm.dubbers.map(function(dubber, index){
      if(dubber.id == idDubber) {
        currentFilm.dubbers.splice(index, 1);
      }
    });
    this.filmService.update(currentFilm);
  }

  addDubberHasParticipated(form: NgForm) {
    let dubbersID = [];
    let currentFilm = this.filmService.film;
    //Create dubber object
    let currentDubber = form.value;
    let dubberData = currentDubber.dubbers.split(",");
    let objDubber = {
    	id: dubberData[0],
    	name: dubberData[1]
    };
    //end
    //Create an array of dubber's id
    currentFilm.dubbers.map(function(dubber) {
      dubbersID.push(dubber.id);
    });
    //end
    if(dubbersID.includes(objDubber.id)) {
      alert("Dubber is already present");
    } else {
      currentFilm.dubbers.push(objDubber);
      this.filmService.update(currentFilm);
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
