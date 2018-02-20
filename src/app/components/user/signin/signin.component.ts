import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from '../user.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  constructor( private router: Router, private userService: UserService ) { }

  signIn(form: NgForm, e) {
    let credentials = form.value;
    if(credentials.email == "admin" && credentials.password == "admin") {
      console.log("ok puoi entrare");
      // this.router.navigate(['/dashboard']);
      console.log(this.router.navigate(['../../dashboard']));
    } else {
      console.log("dati non corretti");
    }
  }

  ngOnInit() {
  }

}
