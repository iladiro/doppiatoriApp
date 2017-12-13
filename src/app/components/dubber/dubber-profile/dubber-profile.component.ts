import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';

@Component({
  templateUrl: './dubber-profile.component.html',
  styleUrls: ['./dubber-profile.component.scss'],
  providers: [DubberService]
})

export class DubberProfileComponent implements OnInit {

  //dubbersList: DubberModel[];

  dubber: {};

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private dubberService: DubberService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.dubberService.getDubber(this.id);
    });
  }

}
