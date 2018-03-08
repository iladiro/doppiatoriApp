import { Component, OnInit } from '@angular/core';

// Services
import { DubberService } from '../_services/index';
import { FilmService } from '../../film/_services/index';

// Models
import { Dubber } from '../_models/index';
import { Film } from '../../film/_models/index';

@Component({
  templateUrl: './dubbers-list.component.html',
  styleUrls: ['./dubbers-list.component.scss']
})

export class DubbersListComponent implements OnInit {

  private currentDubber;
  private DBTable:string = "dubbers";
  private message = {
    "alert": {
      "text": "",
      "class": ""
    },
    "modal": {
      "text": "",
      "response": ""
    }
  };
  dubbers: Dubber[] = [];
  films: Film[] = [];

  constructor(
    private dubberService: DubberService,
    private filmService: FilmService
  ) {}

  private dataset(items) {
    this.dubbers = items;
  }

  private setConfirm(data) {
    this.message.modal.response = data;
    if(data == "true") {
      this.delete(this.currentDubber);
    }
  }

  private passCurrentDubber(dubber) {
    this.message.modal.text = "Are you sure you want to delete it?";
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
      this.message.alert.text = "You can't delete it, because this dubber is using!";
      this.message.alert.class = "danger";
    } else {
      this.dubberService.delete(dubber.id).subscribe(
        data => {
          this.dubbers.splice(index, 1);
          this.message.alert.text = "It has been deleted successfully!";
          this.message.alert.class = "success";
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
