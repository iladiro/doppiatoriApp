import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  constructor( private router: Router ) { }

  signIn(form: NgForm, e) {
    // let username = e.elements[0].value;
    // let password = e.elements[1].value;
    let credentials = form.value;
    if(credentials.email == "admin" && credentials.password == "admin") {
      this.router.navigate(['dashboard']);
      console.log("ok puoi entrare");
    } else {
      console.log("dati non corretti");
    }
  }

  ngOnInit() {
  }

}
