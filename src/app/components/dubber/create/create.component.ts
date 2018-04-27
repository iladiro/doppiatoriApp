import { Component } from '@angular/core';
import { Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';

// Services
import { DubberService } from '../_services/index';

// Models
import { Dubber } from '../_models/index';

@Component({
  moduleId: module.id,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class AddDubberComponent {

  constructor(
    private dubberService: DubberService,
    private http: HttpClient
  ) {}

  alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  id: number;
  status: string = "";
  dubbers: Dubber[];
  qualifications;

  dubber: any = {};
  bank: any = {};
  address: any = {};

  create(){
    this.check();
  }

  check() {
    let dubbers_email = [];

    // Cicla per recuperare la mail di tutti i Dubber registrati
    for(let dubber of this.dubbers) {
      dubbers_email.push(dubber.email);
    }
    // end

    // Controlla prima se il dubber è già presente
    if(dubbers_email.includes(this.dubber.email)) {
      this.alert_message = {
        "text": "Non puoi aggiungere questo doppiatore perché la mail con cui vuoi registralo è già presente nel Database",
        "class": "danger",
        "display": true
      }
      return;
      // se non lo è, aggiungilo
    } else {
      this.save();
    };
  }

  save() {
    this.dubber.avatar = this.dubber.name.charAt(0);
    this.dubberService.create(this.dubber).subscribe(
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
      this.http.post("http://localhost:3000/banks", this.bank).subscribe(
        err => {
          console.log(err)
        }
      );
      this.http.post("http://localhost:3000/addresses", this.address).subscribe(
        err => {
          console.log(err)
        }
      );
    }
  }

  loadAllItems() {
    this.dubberService.getAll().subscribe(
      data => {
        this.dubbers = data;
      }
    );
  }

  ngOnInit() {
    this.loadAllItems();

    this.http.get("http://localhost:3000/qualifications").subscribe(
      data => {
        this.qualifications = data;
      },
      err => {
        console.log(err)
      }
    );
  }

}
