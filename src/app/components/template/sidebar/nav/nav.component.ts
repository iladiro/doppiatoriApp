import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class SideBarNavComponent implements OnInit {

  public open:boolean = false;

  constructor() { }

  openMenu() {
    if(this.open == false) {
      this.open = true;
    } else {
      this.open = false;
    }
  }

  ngOnInit() {}

}
