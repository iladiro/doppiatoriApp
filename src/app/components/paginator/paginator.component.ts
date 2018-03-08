import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'underscore';

import { PagerService } from './_services/index'

@Component({
  moduleId: module.id,
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private pagerService: PagerService
  ) { }

  // array of all items to be paged
  allItems: any;
  // pager object
  pager: any = {};
  // paged items
  @Output() pagedItems = new EventEmitter();
  @Input() DBtable:string;

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItems.emit(this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1));
  }

  ngOnInit() {
    // get dummy data
    this.http.get("http://localhost:3000/" + this.DBtable + "/").subscribe(
      data => {
        // set items to json response
        this.allItems = data;
        // initialize to page 1
        this.setPage(1);
      }
    );
  }
}
