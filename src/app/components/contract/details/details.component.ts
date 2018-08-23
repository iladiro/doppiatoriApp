import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { Service } from '../../../services/index';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ContractDetailsComponent implements OnInit {

  private id: number;
  private contract: any;

  constructor(
    private route: ActivatedRoute,
    private service: Service
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.service.getById("contracts", "id", this.id).subscribe(
        data => {
          console.log(data);
          this.contract = data;
        }
      );
    });
  }

}
