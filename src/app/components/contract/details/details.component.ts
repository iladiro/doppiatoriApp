import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// Services
import { Service } from '../../../services/index';
import { ContractService } from '../_services/index';

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
    private service: Service,
    private ownservice: ContractService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.ownservice.getById(this.id).subscribe(
        data => {
          this.contract = data;
        }
      );
    });
  }

}
