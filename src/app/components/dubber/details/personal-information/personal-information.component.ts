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
  @Output() event = new EventEmitter();

  private qualifications;

  constructor(
    private service: Service
  ) { }

  private upDate(){
    this.dubber.avatar = this.dubber.name.charAt(0);

    let dubber_obj = Object.assign({}, this.dubber);
    delete dubber_obj.films;
    delete dubber_obj.invoices;
    delete dubber_obj.banks;
    delete dubber_obj.addresses;

    this.service.update("dubbers", dubber_obj).subscribe(
      data => {
        this.event.emit({"text": "Aggiornato con successo!", "class": "success", "display": true});
      },
      err => {
        this.event.emit({"text": "!Si è verificato un errore", "class": "danger", "display": true});
      }
    );
  }

  ngOnInit() {
    console.log(this.dubber);
    this.service.getAll("qualifications").subscribe(
      data => {
        this.qualifications = data;
        console.log(data);
      }
    )
  }

}
