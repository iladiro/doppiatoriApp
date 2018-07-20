import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'todo-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ToDoDetailsComponent implements OnInit {

  @Input() riceve;

  constructor() { }

  ngOnInit() {}

}
