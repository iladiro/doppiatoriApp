import { Injectable } from '@angular/core';
import { FilmModel } from './film-model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class FilmService {

  private urlRoot = "http://localhost:3000/film/";
  // private urlRootFilm = "http://localhost:3000/film/";
  // private urlRootDubber = "http://localhost:3000/dubbers/";
  // private urlRootAccount = "http://localhost:3000/accounts/";
  private urlRootRelationship = "http://localhost:3000/relationship/";
  filmsList;
  film;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {
    this.filmsList = []
  }

  ngOnInit(): void {}

  getAll() {
    this.http.get(this.urlRoot).subscribe(
      data => {
        this.filmsList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getById(idfilm) {
    this.http.get(this.urlRoot + idfilm.toString()).subscribe(
      data => {
        this.film = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  create(film) {
    this.http.post(this.urlRoot, film).subscribe(
      data => {
        this.filmsList.push(data);
      }
    );
  };

  delete(film) {
    let index = this.filmsList.indexOf(film);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.http.delete(this.urlRoot + film.id.toString()).subscribe(
        data => {
          this.filmsList.splice(index, 1);
        }
      )
    }
  };

  update(film) {
    var confirmRequest = confirm("Are you sure you wanna run the following changes?");
    if (confirmRequest == true) {
      this.http.put(this.urlRoot + film.id.toString(), film).subscribe(
        data => {
          // this.film = data;
        }
      );
    };
  };

}
