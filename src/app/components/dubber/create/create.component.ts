import { Component } from '@angular/core';
import { Response } from "@angular/http";
import { CodiceFiscale } from 'codice-fiscale-js';

// Services
import { Service } from '../../../services/index';

// Models
import { Dubber } from '../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class AddDubberComponent {

  constructor(
    private service: Service
  ) {}

  private alert_message;

  id: number;
  status: string = "";
  // dubbers: Dubber[];
  dubbers: any = [];
  qualifications: any = [];
  nationalities: any = [];

  dubber: any = {};
  bank: any = {};
  address: any = {};
  enpals_categories: any = {};

  private check_domicilio:string = "no";

  onSelectionChange(value) {
    this.check_domicilio = value;
  }

  create(){
    this.generateFiscalCode();
    this.checkRecordAlreqdyPresent();
  }

  generateFiscalCode() {
    let birth_date = this.dubber.birth_date.split("-");
    let fiscal_code = new CodiceFiscale({
      name: this.dubber.name,
      surname: this.dubber.surname,
      gender: this.dubber.gender,
      day: +birth_date[2],
      month: +birth_date[1],
      year: +birth_date[0],
      birthplace: this.dubber.birth_place
      //birthplaceProvincia: this.dubber.birth_province
    });
    console.log(fiscal_code.cf);
    this.dubber.fiscal_code = fiscal_code.cf;
  }

  checkRecordAlreqdyPresent() {
    let results = this.dubbers.some(elem => {
      return elem.fiscal_code == this.dubber.fiscal_code;
    });
    if(results) {
      this.alert_message = "prohibition";
    } else {
      this.save();
    };
  }

  save() {
    this.dubber.avatar = this.dubber.name.charAt(0);
    this.service.create("dubbers", this.dubber).subscribe(
      resp => {
        let str = resp.headers.get("location");
        let patt = /(\d+)/g;
        let result = str.match(patt);
        this.id = Number(result[0]);
        this.alert_message = "success";
        this.status = "ok";
      },
      err => {
        this.alert_message = "rejected";
      },
      () => this.addDataInRelationTable()
    );
  }

  addDataInRelationTable() {
    if(this.status == "ok") {
      this.bank.dubber_id = this.id;
      this.address.dubber_id = this.id;
      if(this.check_domicilio == "yes") {
        this.address.home_address = this.address.residence_address;
        this.address.home_postcode = this.address.residence_postcode;
        this.address.home_city = this.address.residence_city;
      }
      this.enpals_categories.dubber_id = this.id;
      this.service.create("banks", this.bank).subscribe(
        err => {
          console.log(err)
        }
      );
      this.service.create("addresses", this.address).subscribe(
        err => {
          console.log(err)
        }
      );
      this.service.create("enpals_categories", this.enpals_categories).subscribe(
        data => {
          let str = data.headers.get("location");
          let patt = /(\d+)/g;
          let result = str.match(patt);
          this.enpals_categories.id = Number(result[0]);
          this.updateRecord("dubbers", this.id, "enpals_cat_id", this.enpals_categories.id);
          console.log("ok");
        },
        err => {
          console.log(err)
        }
      );
    }
  }

  private updateRecord(table, id_record, column, value) {
    let obj = {
      "id": id_record,
      [column]: value
    };
    this.service.update(table, obj).subscribe(
      data => {
        console.log("ok")
      },
      err => {
        console.log(err)
      }
    )
  }

  loadAllItems(table, variable, condition) {
    this.service.getAll(table, condition).subscribe(
      data => {
        this[variable] = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems("dubbers", "dubbers", "all");
    this.loadAllItems("qualifications", "qualifications", "all");
    this.loadAllItems("nationalities", "nationalities", "all");
  }

}
