import { Component } from '@angular/core';
import { Response } from "@angular/http";

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

  alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  id: number;
  status: string = "";
  // dubbers: Dubber[];
  dubbers: any = [];
  qualifications;

  dubber: any = {};
  bank: any = {};
  address: any = {};

  create(){
    this.check();
  }

  check() {
    let results = this.dubbers.some(elem => {
      return elem.email == this.dubber.email;
    });
    if(results) {
      this.alert_message = {
        "text": "Non puoi aggiungere questo doppiatore perché la mail con cui vuoi registralo è già presente nel Database",
        "class": "danger",
        "display": true
      }
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
        this.alert_message = {
          "text": "L'operazione è andata a buon fine, doppiatore creato correttamente.",
          "class": "success",
          "display": true
        }
        this.status = "ok";
      },
      err => {
        this.alert_message = {
          "text": "Si è verificato un errore!",
          "class": "danger",
          "display": true
        }
      },
      () => this.addDataInRelationTable()
    );
  }

  addDataInRelationTable() {
    if(this.status == "ok") {
      this.bank.dubber_id = this.id;
      this.address.dubber_id = this.id;
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
    }
  }

  loadAllItems() {
    this.service.getAll("dubbers").subscribe(
      data => {
        this.dubbers = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems();
    this.service.getAll("qualifications").subscribe(
      data => {
        this.qualifications = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
