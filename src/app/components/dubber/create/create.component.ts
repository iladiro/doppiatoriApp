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
  model: any = {};

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  create(){
    this.model.id = Math.floor((Math.random() * 1000000) + 1);
    this.model.film = [];
    this.model.invoices = [];
    this.getFirstChar(this.model);
    let dubbersEmail = [];

    // Cicla per recuperare la mail di tutti i Dubber registrati
    for(let dubber of this.dubbers) {
      dubbersEmail.push(dubber.email);
    }
    // end

    // Controlla prima se il dubber è già presente
    if(dubbersEmail.includes(this.model.email)) {
      this.alertMessage = {
        "text": "You can't add this user bacause this email is already used!",
        "class": "danger",
        "display": true
      }
      return;
      // se non lo è aggiungilo
    } else {
      this.dubberService.create(this.model).subscribe(
        data => {
          this.alertMessage = {
            "text": "Film has been created successfully!",
            "class": "success",
            "display": true
          }
          this.model = {
            "name": "",
            "surname": "",
            "fiscalCode": "",
            "birthdate": "",
            "birthplace": "",
            "birthcounty": "",
            "email": "",
            "phone": "",
            "residenceplace": "",
            "residenceaddress": "",
            "residencecountry": ""
          };
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

  ngOnInit() {
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

}
