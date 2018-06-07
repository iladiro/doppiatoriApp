import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'add-film-dubber',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class AddFilmDubberComponent implements OnInit {

  @Input() film: any;
  @Output() event = new EventEmitter();
  private dubbers: any = [];
  private dubber;

  constructor(
    private service: Service,
  ) { }

  private addDubberSelected(form: NgForm) {
    let dubber = form.value;
    console.log(dubber);
    dubber = dubber.dubber.split(";");
    this.dubber = {
    	"id": dubber[0],
    	"name": dubber[1],
      "surname": dubber[2]
    };
    this.check();
  }

  private check() {
    let results = this.film.dubbers.some(elem => {
      return elem.id == this.dubber.id;
    });
    if(results) {
      this.event.emit("prohibition");
    } else {
      this.save();
    };
  }

  private save() {
    let dubber_film = {
      "film_id": this.film.id,
      "dubber_id": this.dubber.id
    };
    this.service.create("dubbers_films", dubber_film).subscribe(
      data => {
        this.film.dubbers.push(this.dubber);
        this.event.emit("success");
      },
      err => {
        this.event.emit("rejected");
      }
    );
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers", "not_archived");
  }

}
