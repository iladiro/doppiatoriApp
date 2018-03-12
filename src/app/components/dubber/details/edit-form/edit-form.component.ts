import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { DubberService } from '../../_services/index';

@Component({
  selector: 'editForm',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  @Input() model: any;
  @Output() event = new EventEmitter();

  constructor(private dubberService: DubberService) { }

  private upDate(){
    this.dubberService.update(this.model).subscribe(
      data => {
        this.event.emit({"text": "It has been updated successfully", "class": "success"});
      },
      err => {
        this.event.emit({"text": "Error", "class": "danger"});
      }
    );
  }

  ngOnInit() {
  }

}
