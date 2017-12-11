import { Injectable } from '@angular/core';
import { DubberModel } from './dubber-model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()

export class DubberService {

  private dubbersList: DubberModel[];

  private dubber: DubberModel[];

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getDubbers(): DubberModel[] {
    this.http.get('http://localhost:3000/dubbers').subscribe(
      data => {
        this.dubbersList = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  getDubber(idDubber): DubberModel[] {
    this.http.get('http://localhost:3000/dubbers/' + idDubber.toString()).subscribe(
      data => {
        console.log(data);
        this.dubber = data;
      },
      err => {
        console.log("Error occured.")
      }
    );
  };

  addDubber(dubber) {
    this.http.post('http://localhost:3000/dubbers', dubber).subscribe(
      data => {
        this.dubbersList.push(data);
      }
    );
  };

  deleteDubber(dubber) {
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

  updateDubber(dubber) {
    this.http.put('http://localhost:3000/dubbers/' + dubber.id.toString(), dubber).subscribe(
      data => {}
    );
  };

}
