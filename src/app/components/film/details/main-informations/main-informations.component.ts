import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'film-main-informations',
  templateUrl: './main-informations.component.html',
  styleUrls: ['./main-informations.component.scss']
})
export class FilmMainInformationsComponent implements OnInit {

  @Input() film: any;
  @Output() event = new EventEmitter();

  constructor(
    private service: Service
  ) { }

  private update(){
    let film_obj = Object.assign({}, this.film);
    delete film_obj.dubbers;

    this.service.update("films", film_obj).subscribe(
      data => {
        this.event.emit("success");
      },
      err => {
        this.event.emit("rejected");
      }
    );
  }

  ngOnInit() {}

}
