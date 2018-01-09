import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AccountModel } from '../account-model';
import { AccountService } from '../accounts.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  providers: [AccountService]
})

export class AccountDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  currentAccount;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.accountService.getAccount(this.id);
    });
  }

}
