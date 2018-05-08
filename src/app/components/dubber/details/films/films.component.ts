import { Component, OnInit, Input } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'dubber-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class DubberFilmsComponent implements OnInit {

  @Input() dubber: any;
  private alert_message;

  constructor(
    private service: Service
  ) { }

  private delete(film_id) {
    // Cancella film dalla lista dei film del dubber corrente
    let current_dubber = this.dubber;
    this.service.deleteFilmDubber("dubbers_films", film_id, this.dubber.id).subscribe(
        data => {
          current_dubber.films.map(function(film, index){
            if(film.id == film_id) {
              current_dubber.films.splice(index, 1);
            }
          });
          this.alert_message = "success";
        },
        err => {
          this.alert_message = "rejected";
        }
    )
  }

  ngOnInit() {
  }

}
