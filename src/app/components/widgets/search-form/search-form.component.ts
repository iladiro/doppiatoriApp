import { Component, Output, EventEmitter } from '@angular/core';
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

  @Output() results = new EventEmitter();
  searchTerm$ = new Subject<string>();

  private loadAll() {
    this.searchService.getAll().subscribe(
      data => {
        this.results.emit(data)
      }
    );
    // this.searchTerm$ = "ff";
  }

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$).subscribe(
      data => {
        this.results.emit(data)
      }
    );
  }
}
