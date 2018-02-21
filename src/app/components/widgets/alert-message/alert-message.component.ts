import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alertMessage',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  @Input() message;

  constructor() { }

  ngOnInit() {
  }

}
