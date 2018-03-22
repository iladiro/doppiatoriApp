import { Component } from '@angular/core';

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

  constructor(private dubberService: DubberService) {}

  private alertMessage = {
    "display": false,
    "text": "",
    "class": ""
  };
  dubbers: Dubber[];
  new_dubber: any = {};

  create(){
    this.new_dubber.id = Math.floor((Math.random() * 1000000) + 1);
    this.new_dubber.film = [];
    this.new_dubber.invoices = [];
    this.new_dubber.avatar = this.new_dubber.name.charAt(0);
    let dubbersEmail = [];

    // Cicla per recuperare la mail di tutti i Dubber registrati
    for(let dubber of this.dubbers) {
      dubbersEmail.push(dubber.email);
    }
    // end

    // Controlla prima se il dubber è già presente
    if(dubbersEmail.includes(this.new_dubber.email)) {
      this.alertMessage = {
        "text": "You can't add this user bacause this email is already used!",
        "class": "danger",
        "display": true
      }
      return;
      // se non lo è aggiungilo
    } else {
      this.dubberService.create(this.new_dubber).subscribe(
        data => {
          this.alertMessage = {
            "text": "Film has been created successfully!",
            "class": "success",
            "display": true
          }
          // this.new_dubber = {
          //   "name": "",
          //   "surname": "",
          //   "fiscal_code": "",
          //   "birth_date": "",
          //   "birth_place": "",
          //   "birth_county": "",
          //   "email": "",
          //   "phone": "",
          //   "residence_place": "",
          //   "residence_address": "",
          //   "residence_country": ""
          // };
        },
        err => {
          this.alertMessage = {
            "text": "Error occured!",
            "class": "danger",
            "display": true
          }
        }
      );
    };
  }

  loadAllItems() {
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

  ngOnInit() {
    this.loadAllItems();
  }

}
