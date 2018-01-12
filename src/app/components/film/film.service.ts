import { Injectable } from '@angular/core';
import { FilmModel } from './film-model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class FilmService {

  private filmsList;

  private film;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    this.http.get('http://localhost:3000/film').subscribe(
      data => {
        this.filmsList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getById(idfilm) {
    this.http.get('http://localhost:3000/film/' + idfilm.toString()).subscribe(
      data => {
        this.film = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  create(film) {
    this.http.post('http://localhost:3000/film', film).subscribe(
      data => {
        this.filmsList.push(data);
      }
    );
  };

  delete(film) {
    let index = this.filmsList.indexOf(film);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.http.delete('http://localhost:3000/film/' + film.id.toString()).subscribe(
        data => {
          this.filmsList.splice(index, 1);
        }
      )
    }
  };

  update(film) {
    var confirmRequest = confirm("Are you sure you wanna run the following changes?");
    if (confirmRequest == true) {
      this.http.put('http://localhost:3000/film/' + film.id.toString(), film).subscribe(
        data => {}
      );
    };
  };

}
