import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { DubberService } from '../../_services/index';

@Component({
  selector: 'editForm',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  @Input() dubber: any;
  @Output() event = new EventEmitter();

  banks;
  addresses;

  constructor(private dubberService: DubberService) { }

  private upDate(){
    this.dubber.avatar = this.dubber.name.charAt(0);

    let dubber_obj = Object.assign({}, this.dubber);
    delete dubber_obj.films;
    delete dubber_obj.invoices;
    delete dubber_obj.banks;
    delete dubber_obj.addresses;

    this.dubberService.update(dubber_obj).subscribe(
      data => {
        this.event.emit({"text": "Aggiornato con successo!", "class": "success", "display": true});
      },
      err => {
        this.event.emit({"text": "!Si è verificato un errore", "class": "danger", "display": true});
      }
    );
  }

  ngOnInit() {
    this.banks = this.dubber.banks;
    this.addresses = this.dubber.addresses;
    console.log(this.addresses)
  }

}
