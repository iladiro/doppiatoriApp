import { Component, OnInit, Input } from '@angular/core';
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  // selector: 'router-outlet',
  templateUrl: './dubbers-list.component.html',
  styleUrls: ['./dubbers-list.component.scss'],
  providers: [DubberService]
})

export class DubbersListComponent implements OnInit {

  //@Input() dubbersList: DubberModel[];

  private currentItem;

  constructor(private dubberService: DubberService) {}

  onSubmit(form: NgForm){
    let currentDubber = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    let dubber:DubberModel{} = {
      id: lengthDubbersIndex,
      name: currentDubber.name,
      surname: currentDubber.surname,
      age: currentDubber.age,
      gender: currentDubber.gender,
      nationality: currentDubber.nationality,
      photo: currentDubber.photo
    };
    this.dubberService.addDubber(dubber);
    // if(this.currentItem){
    //   this.dubberService.updateDubber(this.currentItem);
    // } else {
    //   this.dubberService.addDubber(dubber);
    // }
  }

  onDelete(dubber) {
    this.dubberService.deleteDubber(dubber);
  }

  // modifyItem() {
  //   this.dubberService.updateDubber(this.currentItem);
  // }

  getSingleItem(dubber) {
    console.log("dubber " + JSON.stringify(dubber));
    this.currentItem = dubber;
  }

  ngOnInit() {
    this.dubberService.getDubbers();
  }

}
