import { Component, OnInit, Input } from '@angular/core';
import { DubbersListComponent } from '../dubbers-list/dubbers-list.component';
import { DubberService } from '../_services/index';
import {NgForm} from '@angular/forms';

@Component({
  templateUrl: './add-dubber.component.html',
  styleUrls: ['./add-dubber.component.scss']
})

export class AddDubberComponent implements OnInit {

  constructor(private dubberService: DubberService) {}

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  onSubmit(form: NgForm){
    let dubbersList = this.dubberService.dubbersList;
    let currentDubber = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    currentDubber.id = lengthDubbersIndex.toString();
    currentDubber.film = [];
    currentDubber.invoices = [];
    this.getFirstChar(currentDubber);
    for(let dubber of dubbersList) {
      if(dubber.email == currentDubber.email) {
        alert("You can't add this user bacause this email is already used!");
        return;
      } else {
        this.dubberService.create(currentDubber);
        form.reset();
      }
    };
  }

  ngOnInit() {
    this.dubberService.getAll();
  }

}
