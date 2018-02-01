import { Component, OnInit, Input } from '@angular/core';
import { DubbersListComponent } from '../dubbers-list/dubbers-list.component';
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './add-dubber.component.html',
  styleUrls: ['./add-dubber.component.scss']
})

export class AddDubberComponent implements OnInit {

  private currentDubber;

  constructor(private dubberService: DubberService) {}

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  onSubmit(form: NgForm){
    this.currentDubber = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    this.currentDubber.id = lengthDubbersIndex;
    this.currentDubber.film = [];
    this.getFirstChar(this.currentDubber);
    this.dubberService.create(this.currentDubber);
    form.reset();
  }

  ngOnInit() {}

}