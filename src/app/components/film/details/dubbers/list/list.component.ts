import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'film-dubbers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilmDubbersListComponent implements OnInit {

  @Input() film: any;
  @Output() event = new EventEmitter();

  private modal_message = {
    "text": "Sei sicuro di volerlo cancellare?"
  };

  constructor(
    private service: Service,
  ) { }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.film);
    }
  }

  private delete(dubber) {
    let index = this.film.dubbers.indexOf(dubber);
    this.service.deleteFilmDubber("dubbers_films", this.film.id, dubber.id).subscribe(
      data => {
        if(index > -1) {
          this.film.dubbers.splice(index, 1);
        }
        this.event.emit("success");
      },
      err => {
        this.event.emit("rejected");
      }
    );
  }

  ngOnInit() {}

}
