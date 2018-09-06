import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'sidebar-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class SideBarNavComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

}
