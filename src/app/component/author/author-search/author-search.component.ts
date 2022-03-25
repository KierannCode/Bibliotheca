import { Component, OnInit } from '@angular/core';
import { AuthorSearchDto } from 'src/app/dto/AuthorSearchDto';
import { AuthorService } from 'src/app/service/author.service';
import { EventService } from 'src/app/util/service/event.service';
import { ErrorService } from 'src/app/util/service/error.service';

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.css']
})
export class AuthorSearchComponent implements OnInit {
  isVisible = false;

  authorSearchDto: AuthorSearchDto = {};

  constructor(private eventService: EventService, private errorService: ErrorService) {
  }

  ngOnInit(): void {
  }

  expandSearch(): void {
    this.errorService.flushErrors();
    this.isVisible = true;
  }

  collapseSearch(): void {
    this.isVisible = false;
  }

  submit() {
    this.eventService.authorsUpdateEmitter.emit();
  }
}
