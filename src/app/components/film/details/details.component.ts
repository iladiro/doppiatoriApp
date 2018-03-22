import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {NgForm} from '@angular/forms';

// Models
import { Film } from '../_models/index';
import { Dubber } from '../../dubber/_models/index';

// Services
import { FilmService } from '../_services/index';
import { DubberService } from '../../dubber/_services/dubbers.service';


@Component({
  moduleId: module.id,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class FilmDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  film: any;
  dubbers: Dubber[] = [];
  films: Film[] = [];

  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  private upDateFilm(){
    let currentFilm = this.film;
    let dubberService = this.dubberService;

    // Aggiorna il film corrente
    this.filmService.update(this.film).subscribe(
      data => {
        this.alertMessage = {
          "text": "Film has been updated successfully!",
          "class": "success",
          "display": true
        }
      },
      err => {
        this.alertMessage = {
          "text": "Error occured!",
          "class": "danger",
          "display": true
        }
      }
    );
    // end
    // Aggiorna l'oggetto dubber nel quale è contenuto il json del film che è stato appena modificato (proprietà title)
    this.dubbers.forEach(function(dubber) {
      dubber.film.map(function(film, index) {
        if(film.id == currentFilm.id) {
          film.title = currentFilm.title;
        }
      });
      dubberService.update(dubber).subscribe();
    });
    // end
  }

  private deleteDubber(idDubber) {
    let currentFilm = this.film;
    currentFilm.dubbers.map(function(dubber, index){
      if(dubber.id == idDubber) {
        currentFilm.dubbers.splice(index, 1);
      }
    });
    this.filmService.update(this.film).subscribe();


    //Updating dubber object after event delete film
    let idCurrentFilm = this.id;
    let dubberObject;
    this.dubbers.map(function(dubber) {
      if(dubber.id == idDubber) {
        dubber.film.map(function(film, index) {
          if(film.id == idCurrentFilm) {
            dubber.film.splice(index, 1)
          }
        })
        dubberObject = dubber;
      };
    });
    this.dubberService.update(dubberObject).subscribe();
  }

  private addDubberHasParticipated(form: NgForm) {
    // Create dubber object to add
    let dubberToAdd = form.value;
    dubberToAdd = dubberToAdd.dubbers.split(",");
    dubberToAdd = {
    	"id": dubberToAdd[0],
    	"name": dubberToAdd[1]
    };
    // end
    // Film object that we've got from the service, and then we've  extrapolated ID and title
    let currentFilm = this.film;
    let objFilm = {
      "id": this.id,
      "title": this.film.title
    };
    // end

    /*Create an array of dubber's id.
    Then check if the id of the dubber that I want to add is present or not into the array of id*/
    let dubbersID = [];
    currentFilm.dubbers.map(function(dubber) {
      dubbersID.push(dubber.id);
    });
    if(dubbersID.includes(dubberToAdd.id)) {
      this.alertMessage = {
        "text": "Dubber is already present. You can't add it!",
        "class": "danger",
        "display": true
      }
    } else {
      currentFilm.dubbers.push(dubberToAdd);
      this.filmService.update(currentFilm).subscribe();
      /* Cicla tutti i dubber presenti nell'app. Poi controlla se l'id del dubber su cui stai ciclando
      è uguale all'id del dubber che vuoi aggiungere.
      Se SI fai un push dei dati del film all'interno dell'oggetto dubber*/
      this.dubbers.map(function(dubber) {
        if(dubber.id == dubberToAdd.id) {
          dubber.film.push(objFilm);
          dubberToAdd = dubber;
        };
      });
      this.dubberService.update(dubberToAdd).subscribe(
        data => {
          this.alertMessage = {
            "text": "Dubber has been added successfully!",
            "class": "success",
            "display": true
          }
        },
        err => {
          this.alertMessage = {
            "text": "Error occured!",
            "class": "danger",
            "display": true
          }
        }
      );
      // end
    }
    //end
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(this.id).subscribe(
        data => { this.film = data; }
      );
    });
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
  }

}
