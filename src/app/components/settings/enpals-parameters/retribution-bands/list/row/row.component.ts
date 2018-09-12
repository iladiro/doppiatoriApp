import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../../../services/index';

@Component({
  selector: '[retribution-bands-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RetributionBandRowComponent implements OnInit {

  @Input() retribution_band;
  _readonly:boolean = true;
  @Output() msg =  new EventEmitter();
  @Output() data = new EventEmitter();

  constructor(
    private service: Service
  ) { }

  private edit() {
    this._readonly = false;
  }

  private update() {
    this._readonly = true;
    this.service.update("income_classes", this.retribution_band).subscribe(
      data => {
        console.log("ok");
        this.msg.emit({ message: "success", type: "alert"});
      },
      err => {
        console.log(err)
      }
    );
  }

  private annull() {
    this._readonly = true;
  }

  ngOnInit() {
  }

}
