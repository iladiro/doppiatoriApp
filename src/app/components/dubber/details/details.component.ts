import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { DubberService } from '../_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DubberProfileComponent implements OnInit {

  id: number;
  private sub: any;

  dubber: any;
  dubber_film: any;

  private modal_message = {
    "text": ""
  };
  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  constructor(
    private route: ActivatedRoute,
    private dubberService: DubberService
  ) {}

  setMessage(message){
    this.alert_message = {
      "text": message.text,
      "class": message.class,
      "display": message.display
    }
  }

  passCurrentFilm(film) {
    this.modal_message.text = "Sei sicuro di volerlo cancellare?";
    this.dubber_film = film;
  }

  setConfirm(data) {
    if(data == "true") {
      this.deleteFilm(this.dubber_film.id);
    }
  }

  private deleteFilm(film_id) {
    // Cancella film dalla lista dei film del dubber corrente
    let current_dubber = this.dubber;
    this.dubberService.deleteFilmDubber(film_id, this.dubber.id).subscribe(
        data => {
          current_dubber.films.map(function(film, index){
            if(film.id == film_id) {
              current_dubber.films.splice(index, 1);
            }
          });
          this.alert_message = {
            "text": "Cancellato con successo!",
            "class": "success",
            "display": true
          }
        },
        err => {
          this.alert_message = {
            "text": "Error occured!",
            "class": "danger",
            "display": true
          }
        }
    )
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dubberService.getById(this.id).subscribe(
        data => {
          console.log(data);
          this.dubber = data;
        }
      );
    });
  }

}
