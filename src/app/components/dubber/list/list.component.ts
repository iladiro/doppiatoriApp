import { Component, OnInit } from '@angular/core';

// Services
import { DubberService } from '../_services/index';
import { FilmService } from '../../film/_services/index';

// Models
import { Dubber } from '../_models/index';
import { Film } from '../../film/_models/index';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class DubbersListComponent implements OnInit {

  private currentDubber;
  private DBTable:string = "dubbers";

  dataForRequestSearchComp = {
    "table": "dubbers",
    "parameter": "name"
  };

  private modalMessage = {
    "text": ""
  };
  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };

  dubbers: Dubber[] = [];
  films: Film[] = [];

  constructor(
    private dubberService: DubberService,
    private filmService: FilmService
  ) {}

  private setFoundValueFromSearch(value){
    this.dubbers = value;
  }

  private dataset(items) {
    this.dubbers = items;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.currentDubber);
    }
  }

  private passCurrentDubber(dubber) {
    this.modalMessage.text = "Are you sure you want to delete it?";
    this.currentDubber = dubber;
  }

  delete(dubber) {
    let index = this.dubbers.indexOf(dubber);
    let filmDubbersID = [];
    for(let film of this.films) {
      for(let dubber of film.dubbers) {
        filmDubbersID.push(dubber.id);
      }
    };
    if(filmDubbersID.includes(dubber.id)) {
      this.alertMessage = {
        "text": "You can't delete it, because this dubber is using!",
        "class": "danger",
        "display": true
      }
    } else {
      this.dubberService.delete(dubber.id).subscribe(
        data => {
          this.dubbers.splice(index, 1);
          this.alertMessage = {
            "text": "It has been deleted successfully!",
            "class": "success",
            "display": true
          }
        }
      );
    }
  }

  ngOnInit() {
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
  }

}
