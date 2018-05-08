import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { Service } from '../../../services/index';
import { DubberService } from '../_services/index';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DubberProfileComponent implements OnInit {

  id: number;
  private sub: any;
  dubber: any;
  private alert_message;

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private dubberService: DubberService
  ) {}

  setMessage(message){
    this.alert_message = message;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.dubberService.getById(this.id).subscribe(
        data => {
          this.dubber = data;
        }
      );
    });
  }

}
