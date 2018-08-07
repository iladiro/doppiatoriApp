import { Component, ElementRef, ViewChild, Output, EventEmitter, Input, OnInit } from '@angular/core';
//import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

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
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private searchService: SearchService) {}

  submit(value) {
    this.searchService.buildUrl(this.setDataForRequest, value).subscribe(
      data => {
        this.results.emit(data)
      }
    );
  }

  ngOnInit() {
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      // get value
      .map((evt: any) => evt.target.value)
      // text length must be > 2 chars
      //.filter(res => res.length > 2)
      // emit after 1s of silence
      .debounceTime(1000)
      // emit only if data changes since the last emit
      .distinctUntilChanged()
      // subscription
      .subscribe((text: string) => this.submit(text));
  }
}
