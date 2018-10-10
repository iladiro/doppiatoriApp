import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ReportCollaboratorsListComponent implements OnInit {

  list: any = [];

  constructor() { }

  private getData(data){
    console.log(data);
    this.list = data;
  }

  ngOnInit() {
  }

}
