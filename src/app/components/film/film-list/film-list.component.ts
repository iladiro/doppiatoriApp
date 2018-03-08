import { Component, OnInit } from '@angular/core';
import { Film } from '../_models/index';
import { FilmService } from '../_services/index';

@Component({
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})

export class FilmListComponent implements OnInit {

  private message = {
    "text": "",
    "class": ""
  };
  private DBTable:string = "film";
  films: Film[] = [];

  constructor(private filmService: FilmService) {}

  delete(film) {
    let index = this.films.indexOf(film);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.filmService.delete(film.id).subscribe(
        data => {
          this.message.text = "It has been deleted successfully!";
          this.message.class = "success";
        }
      );
      this.films.splice(index, 1);
    }
  }

  private dataset(items) {
    this.films = items;
  }

  ngOnInit() {
    // this.filmService.getAll().subscribe(
    //   data => { this.films = data; }
    // );
  }

}
