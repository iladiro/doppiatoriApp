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
  private message = {
    "alert": {
      "text": "",
      "class": "",
      "status": ""
    },
    "modal": {
      "text": "",
      "response": ""
    }
  };

  constructor(
    private route: ActivatedRoute,
    private dubberService: DubberService,
    private filmService: FilmService
  ) {}

  setMessage(message){
    this.message.alert.text = message.text;
    this.message.alert.class = message.class;
  }

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  private upDateDubber(){
    this.dubberService.update(this.model).subscribe(
      data => {
        this.message.alert.text = "It has been updated successfully!";
        this.message.alert.class = "success";
        this.message.alert.status = "show"
      },
      err => {
        this.message.alert.text = "Error occured!";
        this.message.alert.class = "danger";
        this.message.alert.status = "show";
      }
    );
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
        this.message.alert.text = "It has been deleted successfully!";
        this.message.alert.class = "success";
      },
      err => {
        this.message.alert.text = "Error occured!";
        this.message.alert.class = "danger";
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
    this.message.modal.text = "Are you sure you want to delete it?";
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
