import { Component, OnInit, Input } from '@angular/core';
import { DubbersListComponent } from '../dubbers-list/dubbers-list.component';
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'addDubber',
  templateUrl: './add-dubber.component.html',
  styleUrls: ['./add-dubber.component.scss']
})

export class AddDubberComponent implements OnInit {

  //selectedNationality: string = "Italian";
  nationalities: string[] = ["Italian", "German", "English", "Spanish"]

  @Input() dubber;

  currentDubber;

  constructor(private dubberService: DubberService) {}

  getFirstChar() {
    let createAvatar = this.currentDubber.name.charAt(0);
    this.currentDubber.avatar = createAvatar;
  }

  onSubmit(form: NgForm){
    this.currentDubber = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    this.currentDubber.id = lengthDubbersIndex;
    this.getFirstChar();
    if(this.dubber) {
      this.dubberService.updateDubber(this.dubber);
      this.dubber = undefined;
    } else {
      this.dubberService.addDubber(this.currentDubber);
      form.reset();
    }
  }

  ngOnInit() {}

}
