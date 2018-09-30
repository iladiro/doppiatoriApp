import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../services/index';

@Component({
  selector: 'film-dubbers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FilmDubbersListComponent implements OnInit {

  @Input() dubbers: any;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor(
    private service: Service,
  ) { }

  private getData(data){
    this.data.emit(data);
  }

  private getMessage(data) {
    if(data.type == "modal") {
      this.msg.emit({message: data.message, type: 'modal'});
    } else if(data.type == "alert") {
      this.msg.emit({message: data.message, type: 'alert'});
    }
  }

  // private setConfirm(data) {
  //   if(data == "true") {
  //     this.delete(this.film);
  //   }
  // }

  // private delete(dubber) {
  //   let index = this.dubbers.indexOf(dubber);
  //   this.service.delete("dubbers", "id", dubber.id).subscribe(
  //     data => {
  //       this.dubbers.splice(index, 1);
  //       this.alert_message = "delete";
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   );
  // }

  ngOnInit() {
  }

}
