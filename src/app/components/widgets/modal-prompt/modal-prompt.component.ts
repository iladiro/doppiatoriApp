import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'modalPrompt',
  templateUrl: './modal-prompt.component.html',
  styleUrls: ['./modal-prompt.component.scss']
})
export class ModalPromptComponent implements OnInit {

  @Input() message:object = {};
  @Output() confirm = new EventEmitter();

  constructor() { }

  private setData(data) {
    this.confirm.emit(data)
  }

  ngOnInit() {
  }

}
