import { Component, OnInit, Input } from '@angular/core';
import { DubbersListComponent } from '../dubbers-list/dubbers-list.component';
import { DubberModel } from '../dubber-model';
import { DubberService } from '../dubbers.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'addForm',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  @Input() dubber;

  constructor(private dubberService: DubberService) {}

  onSubmit(form: NgForm){
    let currentDubber = form.value;
    let lengthDubbersIndex = Math.floor((Math.random() * 1000000) + 1);
    currentDubber.id = lengthDubbersIndex;
    if(this.dubber) {
      this.dubberService.updateDubber(this.dubber);
      this.dubber = undefined;
    } else {
      this.dubberService.addDubber(currentDubber);
    }
  }

  ngOnInit() {}

}
