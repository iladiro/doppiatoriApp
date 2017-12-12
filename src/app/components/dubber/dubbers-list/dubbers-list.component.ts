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

  // currentItem.name:string;
  //
  // clear(){
  //   this.currentItem.name = '';
  // }

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
    if(this.currentItem) {
      this.dubberService.updateDubber(this.currentItem);
      this.currentItem = undefined;
    } else {
      //console.log("non ancora presente");
      this.dubberService.addDubber(dubber);
    }
  }

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
