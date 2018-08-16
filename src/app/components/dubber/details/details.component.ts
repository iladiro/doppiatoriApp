import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { Service } from '../../../services/index';
import { DubberService } from '../_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DubberProfileComponent implements OnInit {

  public dubber: any;
  private id: number;
  private return_data;

  private alert_message;
  private modal_message = {
    "text": ""
  };

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private dubberService: DubberService
  ) {}

  private setMessage(message_obj){
    if(message_obj.type == 'modal') {
      this.modal_message.text = message_obj.text;
    } else {
      this.alert_message = message_obj.text;
    }
  }

  private setData(data){
    this.return_data = data;
  }

  private setConfirm(data) {
    if(data == "true") {
      this.delete(this.return_data);
    }
  }

  delete(bank) {
    let index = this.dubber.banks.indexOf(bank);
    this.service.delete("banks", "id", bank.id).subscribe(
      data => {
        // if(index > -1) {
        //   this.dubber.banks.splice(index, 1);
        // }
        this.dubber.banks.splice(index, 1);
        this.alert_message = "delete";
      },
      err => {
        this.alert_message = "rejected";
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dubberService.getById(this.id).subscribe(
        data => {
          this.dubber = data;
        }
      );
    });
  }

}
