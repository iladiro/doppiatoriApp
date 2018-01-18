import { Component, OnInit, Input } from '@angular/core';
import { AccountModel } from '../account-model';
import { AccountService } from '../accounts.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})

export class NewAccountComponent implements OnInit {

  private currentAccount;

  constructor(private accountService: AccountService) { }

  getFirstChar(whichModel) {
    let createAvatar = whichModel.name.charAt(0);
    whichModel.avatar = createAvatar;
  }

  onSubmit(form: NgForm){
    this.currentAccount = form.value;
    let index = Math.floor((Math.random() * 1000000) + 1);
    this.currentAccount.id = index;
    this.getFirstChar(this.currentAccount);
    this.accountService.create(this.currentAccount);
    form.reset();
  }

  ngOnInit() {
  }

}
