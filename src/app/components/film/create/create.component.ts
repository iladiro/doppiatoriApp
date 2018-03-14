import { Component } from '@angular/core';

// Models
import { Film } from '../_models/index';
import { Dubber } from '../../dubber/_models/index';

// Services
import { FilmService } from '../_services/index';
import { DubberService } from '../../dubber/_services/dubbers.service';

@Component({
  moduleId: module.id,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class AddFilmComponent {

  model: any = {};
  loading = false;

  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  filmDubbersIdSelected = [];
  dubbers: Dubber[] = [];

  constructor(
    private filmService: FilmService,
    private dubberService: DubberService
  ) {}

  create(){
    this.model.id = Math.floor((Math.random() * 1000000) + 1);
    let arrayOfDubbers = this.filmDubbersIdSelected;
    //From an array of string, create dubber's object.
    this.model.dubbers = this.model.dubbers.map(function(item) {
      var data = item.split(',');
      arrayOfDubbers.push(data[0]);
      return {
        "id": data[0],
        "name": data[1]
      };
    });
    //end
    //Send object film to server
    this.filmService.create(this.model).subscribe(
      data => {
        this.addFilmIntoDubberSelected();
        this.alertMessage = {
          "text": "Film has been created successfully!",
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
    //end
    // form.reset();
  }

  //Aggiungi film ai dubbers selezionati
  addFilmIntoDubberSelected() {
    let arrayOfDubbers = this.filmDubbersIdSelected;
    let service = this.dubberService;
    let currentFilm = this.model;
    let updateDubbers = [];
    this.dubbers.map(function(dubber) {
      if(arrayOfDubbers.includes(dubber.id.toString())) {
        let filmObj = {
          "id": currentFilm.id,
          "title": currentFilm.title
        };
        dubber.film.push(filmObj);
        updateDubbers.push(dubber);
        service.update(dubber).subscribe();
      }
    });
    updateDubbers.forEach(function(dubber) {
      service.update(dubber).subscribe();
    });
  }
  //end

  ngOnInit() {
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

}
