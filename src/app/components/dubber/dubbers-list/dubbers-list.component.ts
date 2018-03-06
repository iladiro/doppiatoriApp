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

  private message = {
    "text": "",
    "class": ""
  };
  dubbers: Dubber[] = [];
  films: Film[] = [];

  constructor(
    private dubberService: DubberService,
    private filmService: FilmService
  ) {}

  delete(dubber) {
    let index = this.dubbers.indexOf(dubber);
    let filmDubbersID = [];
    for(let film of this.films) {
      for(let dubber of film.dubbers) {
        filmDubbersID.push(dubber.id);
      }
    };
    if(filmDubbersID.includes(dubber.id)) {
      this.message.text = "You can't delete it, because this dubber is using!";
      this.message.class = "danger";
    } else {
      this.message = {
        "text": "",
        "class": ""
      };
      this.dubberService.delete(dubber.id).subscribe(
        data => {
          this.dubbers.splice(index, 1);
        }
      );
    }
  }

  ngOnInit() {
    this.filmService.getAll().subscribe(
      data => { this.films = data; }
    );
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

}
