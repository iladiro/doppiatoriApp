import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { Service } from '../../../../services/index';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class DubberPersonalInformationComponent implements OnInit {

  @Input() dubber: any;
  @Output() msg = new EventEmitter();

  private qualifications: any = [];
  private nationalities: any = [];
  private enpals_cat: any = {};

  constructor(
    private service: Service
  ) { }

  private update(){

    this.dubber.avatar = this.dubber.name.charAt(0);

    let dubber_obj = Object.assign({}, this.dubber);
    delete dubber_obj.collaborations;
    //delete dubber_obj.invoices;
    delete dubber_obj.banks;
    delete dubber_obj.addresses;
    delete dubber_obj.enpals_categories;

    this.service.update("dubbers", dubber_obj).subscribe(
      data => {
        this.msg.emit({ message: "success", type: "alert"});
      },
      err => {
        console.log(err);
        this.msg.emit({ message: "rejected", type: "alert"});
      }
    );
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("qualifications", "qualifications", "all");
    this.loadAllItems("nationalities", "nationalities", "all");
    console.log(this.dubber.enpals_categories[0]);
    this.enpals_cat = this.dubber.enpals_categories[0];
  }

}
