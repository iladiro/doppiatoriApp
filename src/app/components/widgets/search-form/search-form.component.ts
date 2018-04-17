import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

// Services
import { SearchService } from './_services/index';

@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [SearchService]
})
export class SearchFormComponent {

  @Input() setDataForRequest;
  @Output() results = new EventEmitter();

  constructor(private searchService: SearchService) {}

  getValue(value) {
    this.searchService.buildUrl(this.setDataForRequest, value).subscribe(
      data => {
        this.results.emit(data)
      }
    );
  }

  ngOnInit() {}
}
