import { Injectable } from '@angular/core';
import { DubberModel } from './dubber-model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class DubberService {

  private dubbersList;

  private dubber;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAll() {
    this.http.get('http://localhost:3000/dubbers').subscribe(
      data => {
        this.dubbersList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getById(idDubber) {
    this.http.get('http://localhost:3000/dubbers/' + idDubber.toString()).subscribe(
      data => {
        this.dubber = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  create(dubber) {
    this.http.post('http://localhost:3000/dubbers', dubber).subscribe(
      data => {
        this.dubbersList.push(data);
      }
    );
  };

  delete(dubber) {
    let index = this.dubbersList.indexOf(dubber);
    var confirmRequest = confirm("Are you sure to delete it?");
    if (confirmRequest == true) {
      this.http.delete('http://localhost:3000/dubbers/' + dubber.id.toString()).subscribe(
        data => {
          this.dubbersList.splice(index, 1);
        }
      )
    }
  };

  update(dubber) {
    var confirmRequest = confirm("Are you sure you wanna run the following changes?");
    if (confirmRequest == true) {
      this.http.put('http://localhost:3000/dubbers/' + dubber.id.toString(), dubber).subscribe(
        data => {}
      );
    };
  };

}
