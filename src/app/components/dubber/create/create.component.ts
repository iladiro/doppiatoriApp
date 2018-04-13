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

  private alert_message = {
    "display": false,
    "text": "",
    "class": ""
  };

  dubbers: Dubber[];
  dubber: any = {};

  create(){
    this.dubber.avatar = this.dubber.name.charAt(0);
    let dubbers_email = [];

    // Cicla per recuperare la mail di tutti i Dubber registrati
    for(let dubber of this.dubbers) {
      dubbers_email.push(dubber.email);
    }
    // end

    // Controlla prima se il dubber è già presente
    if(dubbers_email.includes(this.dubber.email)) {
      this.alert_message = {
        "text": "You can't add this user bacause this email is already used!",
        "class": "danger",
        "display": true
      }
      return;
      // se non lo è aggiungilo
    } else {
      this.dubberService.create(this.dubber).subscribe(
        data => {
          this.alert_message = {
            "text": "Dubber has been created successfully!",
            "class": "success",
            "display": true
          }
          //this.emptyForm()
        },
        err => {
          this.alert_message = {
            "text": "Error occured!",
            "class": "danger",
            "display": true
          }
        }
      );
    };
  }

  // emptyForm() {
  //   document.getElementById("dubberForm").reset()
  // }

  loadAllItems() {
    this.dubberService.getAll().subscribe(
      data => { this.dubbers = data; }
    );
  }

  ngOnInit() {
    this.loadAllItems();
  }

}
