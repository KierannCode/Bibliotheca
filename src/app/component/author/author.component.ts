import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class AuthorComponent implements OnDestroy {
  pageable: Pageable = { page: 0, sort: 'id', order: 'desc' };
  currentPage = 1;

  totalResults = 0;
  firstItem: number | null = null;
  lastItem: number | null = null;

  loadingPage = new Loading();

  subscription: Subscription;

  constructor(public authorManager: AuthorManager, public navbarManager: NavbarManager, public authorService: AuthorService, public eventService: EventService) {
    this.subscription = eventService.authorsUpdateEmitter.subscribe(() => this.requestPage());
    eventService.authorsUpdateEmitter.emit();
  }

  changePage(page: number) {
    this.pageable.page = page;
    this.eventService.authorsUpdateEmitter.emit();
  }

  switchOrder() {
    this.pageable.order = this.pageable.order === 'asc' ? 'desc' : 'asc';
    this.eventService.authorsUpdateEmitter.emit();
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:beforeunload',['$event'])
  showMessage($event: any) {
    if (this.hasModifiedAuthors()) {
      $event.returnValue='All unsaved changes will be lost!';
    }
  }
}
