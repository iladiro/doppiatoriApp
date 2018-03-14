import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Film } from '../../film/_models/index';

// Services
import { DubberService } from '../_services/index';
import { FilmService } from '../../film/_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DubberProfileComponent implements OnInit {

  private currentFilm;
  id: number;
  private sub: any;
  model: any;
  films: Film[];

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private route: ActivatedRoute,
    private dubberService: DubberService,
    private filmService: FilmService
  ) {}

  setMessage(message){
    this.alertMessage.text = message.text;
    this.alertMessage.class = message.class;
    this.alertMessage.display = message.display;
  }

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  private deleteFilm(idFilm) {
    // Cancella film dalla lista dei film del dubber corrente
    let currentDubber = this.model;
    currentDubber.film.map(function(film, index){
      if(film.id == idFilm) {
        currentDubber.film.splice(index, 1);
      }
    });
    this.dubberService.update(this.model).subscribe(
      data => {
        this.alertMessage = {
          "text": "It has been deleted successfully!",
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

    // Cancella il dubber dal film che vuoi cancellare e aggiorna l'oggetto film
    let filmObject;
    this.films.forEach(function(film) {
      if(film.id == idFilm) {
        film.dubbers.map(function(dubber, index) {
          film.dubbers.splice(index, 1);
        });
        filmObject = film;
      }
    });
    this.filmService.update(filmObject).subscribe();
    // end
  }

  setConfirm(data) {
    if(data == "true") {
      this.deleteFilm(this.currentFilm.id);
    }
  }

  passCurrentFilm(film) {
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.currentFilm = film;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dubberService.getById(this.id).subscribe(
        data => { this.model = data; }
      );
    });
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
  }

}
