import { Component, OnInit } from '@angular/core';
import { AccountService } from '../accounts.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  onDelete(account) {
    this.accountService.delete(account);
  }

  ngOnInit() {
    this.accountService.getAll();
  }

}
