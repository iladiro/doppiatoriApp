import { Injectable } from '@angular/core';
import { DubberModel } from './dubber-model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable()

export class DubberService {

  private dubbersList: DubberModel[];

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

  addDubber(dubber) {
    this.http.post('http://localhost:3000/dubbers', dubber).subscribe(
      data => {
        this.dubbersList.push(data);
      }
    );
  };

  deleteDubber(dubber) {
    let index = this.dubbersList.indexOf(dubber);
    this.http.delete('http://localhost:3000/dubbers/' + dubber.id).subscribe(
      data => {
        this.dubbersList.splice(index, 1);
      }
    )
  };

}
