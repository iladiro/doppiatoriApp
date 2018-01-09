import { Component, OnInit, Input } from '@angular/core';
import { AccountModel } from '../account-model';
import { AccountService } from '../accounts.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [AccountService]
})

export class NewAccountComponent implements OnInit {

  currentAccount;

  constructor(private accountService: AccountService) { }

  onSubmit(form: NgForm){
    this.currentAccount = form.value;
    let index = Math.floor((Math.random() * 1000000) + 1);
    this.currentAccount.id = index;
    this.accountService.addAccount(this.currentAccount);
    form.reset();
  }

  ngOnInit() {
  }

}
