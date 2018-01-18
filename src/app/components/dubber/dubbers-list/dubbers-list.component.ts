import { Component, OnInit } from '@angular/core';
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './dubbers-list.component.html',
  styleUrls: ['./dubbers-list.component.scss']
})

export class DubbersListComponent implements OnInit {

  constructor(private dubberService: DubberService) {}

  onDelete(dubber) {
    this.dubberService.delete(dubber);
  }

  ngOnInit() {
    this.dubberService.getAll();
  }

}
