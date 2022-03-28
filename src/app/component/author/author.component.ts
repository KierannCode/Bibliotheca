import { Component } from '@angular/core';
import { AuthorService } from 'src/app/service/author.service';
import { Loading } from 'src/app/util/Loading';
import { Pageable } from 'src/app/util/Pageable';
import { EventService } from 'src/app/util/service/event.service';
import { NavbarManager } from '../navbar/NavbarManager';
import { AuthorManager } from './AuthorManager';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  pageable: Pageable = { page: 0, sort: 'id', order: 'desc' };

  totalResults = 0;
  firstItem: number | null = null;
  lastItem: number | null = null;

  loadingPage = new Loading();

  constructor(public authorManager: AuthorManager, public navbarManager: NavbarManager, public authorService: AuthorService, eventService: EventService) {
    eventService.authorsUpdateEmitter.subscribe(() => this.requestPage());
    this.requestPage();
  }

  changePage(page: number) {
    this.pageable.page = page - 1;
    this.requestPage();
  }

  hasModifiedAuthors(): boolean {
    let modified = false;
    this.authorManager.authors.forEach(author => modified ||= author.modified);
    return modified;
  }

  requestPage() {
    if (!this.hasModifiedAuthors() || confirm('You have unsaved changes, do you want to discard them and reload the page?')) {
      let observable = this.authorService.getAuthors(this.authorManager.authorSearchDto, this.pageable);
      observable.callback = (page) => {
        this.authorManager.authors = page.content;
        this.totalResults = page.totalElements;
        this.firstItem = this.pageable.page * this.authorService.pageSize + 1;
        this.lastItem = this.pageable.page * this.authorService.pageSize + page.content.length;
      };
      observable.loading = this.loadingPage;
      observable.subscribe();
    }
  }
}
