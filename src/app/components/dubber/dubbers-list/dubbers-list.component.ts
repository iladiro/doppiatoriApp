import { Component, OnInit } from '@angular/core';
import { DubberService } from '../_services/index';
import { FilmService } from '../../film/_services/index';

@Component({
  templateUrl: './dubbers-list.component.html',
  styleUrls: ['./dubbers-list.component.scss']
})

export class DubbersListComponent implements OnInit {

  constructor(
    private dubberService: DubberService,
    private filmService: FilmService
  ) {}

  onDelete(dubber) {
    let filmsList = this.filmService.filmsList;
    let dubberId = dubber.id;
    let filmDubbersID = [];
    for (let film of filmsList) {
      for (let dubber of film.dubbers) {
        filmDubbersID.push(dubber.id);
      }
    };
    if(filmDubbersID.includes(dubberId)) {
      alert("You can't delete it, because this dubber is using!");
    } else {
      this.dubberService.delete(dubber);
    }
  }

  ngOnInit() {
    this.dubberService.getAll();
    this.filmService.getAll();
  }

}
