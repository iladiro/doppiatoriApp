import { Component, OnInit } from '@angular/core';
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  //selector: 'app-root',
  templateUrl: './dubbers-list.component.html',
  styleUrls: ['./dubbers-list.component.scss'],
  providers: [DubberService]
})

export class DubbersListComponent implements OnInit {

  currentItem;

  constructor(private dubberService: DubberService) {}

  onDelete(dubber) {
    this.dubberService.deleteDubber(dubber);
  }

  getSingleItem(dubber) {
    this.currentItem = dubber;
  }

  ngOnInit() {
    this.dubberService.getDubbers();
  }

}
