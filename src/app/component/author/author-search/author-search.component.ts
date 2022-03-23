import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthorSearchDto } from 'src/app/dto/AuthorSearchDto';
import { Author } from 'src/app/model/Author';
import { AuthorService } from 'src/app/service/author.service';
import { EventService } from 'src/app/service/event.service';
import { Pageable } from 'src/app/service/util/Pageable';

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.css']
})
export class AuthorSearchComponent implements OnInit {
  @Input() hideSearch = true;

  authorSearchDto: AuthorSearchDto = {};

  maxSize = 7;
  pageable: Pageable = { page: 0, sort: 'id', order: 'desc' };

  loading = true;

  authors = new Array<Author>();
  totalResults = 0;

  constructor(public authorService: AuthorService, eventService: EventService) {
    this.loadPage();
    eventService.updateAuthors.subscribe(() => this.loadPage());
  }

  ngOnInit(): void {
  }

  loadPage() {
    this.loading = true;
    this.authorService.getAuthors(this.authorSearchDto, this.pageable).subscribe({
      next: (page) => {
        this.authors = page.content;
        this.totalResults = page.totalElements;
      }
    }).add(() => this.loading = false);
  }
}
