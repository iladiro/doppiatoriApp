import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'dubber-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class DubberFilmsComponent implements OnInit {

  @Input() collaborations: any[];
  // @Output() msg =  new EventEmitter();
  // @Output() current_film = new EventEmitter();

  p: number = 1;

  constructor(
    private service: Service
  ) { }

  // private getData(data){
  //   this.current_film.emit(data);
  // }
  //
  // private getMessage(data) {
  //   if(data.type == "modal") {
  //     this.msg.emit({message: data.message, type: 'modal'});
  //   } else if(data.type == "alert") {
  //     this.msg.emit({message: data.message, type: 'alert'});
  //   }
  // }

  ngOnInit() {}

}
