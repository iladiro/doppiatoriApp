import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Models
import { Film } from '../_models/index';

// Services
import { Service } from '../../../services/index';
import { FilmService } from '../_services/index';


@Component({
  moduleId: module.id,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class FilmDetailsComponent implements OnInit {

  private id: number;
  private film: any;
  return_data;

  private alert_message;
  private modal_message = {
    "text": ""
  };

  constructor(
    private route: ActivatedRoute,
    private service: Service,
    private filmService: FilmService
  ) {}

  private setMessage(message_obj){
    console.log(message_obj);
    if(message_obj.type == 'modal') {
      this.modal_message.text = message_obj.message;
    } else if(message_obj.type == 'alert') {
      this.alert_message = message_obj.message;
    }
  }

  private setData(data){
    console.log(data);
    this.return_data = data;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.return_data.item, this.return_data.property, this.return_data.table);
    }
  }

  delete(data, property, table) {
    console.log(data);
    console.log(property);
    console.log(table);
    let index = this.film[property].indexOf(data);
    console.log(index);
    // this.service.delete(table, "id", data.id).subscribe(
    //   data => {
    //     this.film[property].splice(index, 1);
    //     this.alert_message = "delete";
    //   },
    //   err => {
    //     this.alert_message = "rejected";
    //   }
    // )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.filmService.getById(this.id).subscribe(
        data => {
          this.film = data;
        }
      );
    });
  }

}
