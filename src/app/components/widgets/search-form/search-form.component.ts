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
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.search(this.setDataForRequest, this.searchTerm$).subscribe(
      data => {
        this.results.emit(data)
      }
    );
  }
}
