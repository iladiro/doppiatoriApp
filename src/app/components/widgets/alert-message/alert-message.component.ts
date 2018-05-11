import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alertMessage',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  @Input() message;
  private alert = {
    "text": "",
    "class": "",
    "display": false
  };

  constructor() { }

  switchAlert(type) {
    let message = {"success": 1, "delete": 2, "rejected": 3, "prohibition": 4, "archive": 5, "rollback": 6};
    switch(message[type]) {
      case 1:
        this.alert = {
          "text": "L'operazione è andata a buon fine!",
          "class": "success",
          "display": true
        };
        break;
      case 2:
        this.alert = {
          "text": "Cancellato con successo!",
          "class": "success",
          "display": true
        };
        break;
      case 3:
        this.alert = {
          "text": "Si è verificato un errore",
          "class": "danger",
          "display": true
        };
        break;
      case 4:
        this.alert = {
          "text": "Non puoi aggiungerlo poichè è già presente!",
          "class": "danger",
          "display": true
        };
        break;
      case 5:
        this.alert = {
          "text": "Archiviato con successo! NOTA: Hai la possibilità di ripristinarlo!",
          "class": "success",
          "display": true
        };
        break;
      case 6:
        this.alert = {
          "text": "Ripristinato con successo!",
          "class": "success",
          "display": true
        };
        break;
    }
  }

  ngOnInit() {
    this.switchAlert(this.message)
  }

}
