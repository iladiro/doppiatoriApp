import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';

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

  private alert_message = {
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
    let film_obj = Object.assign({}, this.film);
    delete film_obj.dubbers;
    film_obj.id = this.id;

    // Aggiorna il film corrente
    this.filmService.update(film_obj).subscribe(
      data => {
        this.alert_message = {
          "text": "Film has been updated successfully!",
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
    );
    // end
  }

  private deleteDubber(id_dubber) {
    let current_film = this.film;
    this.filmService.deleteFilmDubber(this.id, id_dubber).subscribe(
      data => {
        current_film.dubbers.map(function(dubber, index){
          if(dubber.id == id_dubber) {
            current_film.dubbers.splice(index, 1);
          }
        });
        this.alert_message = {
          "text": "Dubber has been deleted successfully!",
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
    );
  }

  private addDubberSelected(form: NgForm) {
    let current_film = this.film; // oggetto film
    let dubber_id_toadd = form.value; // dati film da aggiungere (id e name)
    dubber_id_toadd = dubber_id_toadd.dubber.split(";");
    dubber_id_toadd = {
    	"id": dubber_id_toadd[0],
    	"name": dubber_id_toadd[1]
    };

    // /*Create an array of dubber's id.
    // Then check if the id of the dubber that I want to add is present or not into the array of id*/
    let dubbers_id = []; // array dove salvare gli id dei dubbers del film
    current_film.dubbers.map(function(dubber) {
      dubbers_id.push(dubber.id);
    });
    //

    if(dubbers_id.includes(Number(dubber_id_toadd.id))) {
      this.alert_message = {
        "text": "Dubber is already present. You can't add it!",
        "class": "danger",
        "display": true
      }
    } else {
      console.log("non ancora presente");
      current_film.dubbers.push(dubber_id_toadd);
      let dubber_film = {
        "film_id": this.id,
        "dubber_id": dubber_id_toadd.id
      };
      this.filmService.createFilmDubbers(dubber_film).subscribe(
        data => {
          this.alert_message = {
            "text": "Dubber has been created successfully!",
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
      );
    }
    //end
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(this.id).subscribe(
        data => {
          this.film = data;
        }
      );
    });
    this.dubberService.getAll().subscribe(
      data => {
        this.dubbers = data;
      }
    );
  }

}
