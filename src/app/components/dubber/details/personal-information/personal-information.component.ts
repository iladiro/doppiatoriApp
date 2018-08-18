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

  constructor(
    private service: Service
  ) { }

  private update(){
    console.log(this.dubber);

    this.dubber.avatar = this.dubber.name.charAt(0);

    let dubber_obj = Object.assign({}, this.dubber);
    delete dubber_obj.films;
    delete dubber_obj.invoices;
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
  }

}
