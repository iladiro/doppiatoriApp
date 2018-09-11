import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'dubber-enpals-cat',
  templateUrl: './enpals-cat.component.html',
  styleUrls: ['./enpals-cat.component.scss']
})
export class DubberEnpalsCatComponent implements OnInit {

  private qualifications: any = [];
  @Input() enpals_cat: any;
  @Output() msg = new EventEmitter();

  constructor(
    private service: Service
  ) { }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  update() {
    this.service.update("enpals_categories", this.enpals_cat).subscribe(
      data => {
        this.msg.emit({ message: "success", type: "alert"});
      },
      err => {
        this.msg.emit({ message: "rejected", type: "alert"});
      }
    )
  }

  ngOnInit() {
    this.loadAllItems("qualifications", "qualifications", "all");
  }

}
