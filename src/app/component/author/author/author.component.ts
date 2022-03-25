import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorService } from 'src/app/service/author.service';
import { ContributorService } from 'src/app/service/contributor.service';
import { Loading } from 'src/app/util/Loading';
import { Pageable } from 'src/app/util/Pageable';
import { EventService } from 'src/app/util/service/event.service';
import { AuthorListComponent } from '../author-list/author-list.component';
import { AuthorSearchComponent } from '../author-search/author-search.component';
import { CreateAuthorModalComponent } from '../create-author-modal/create-author-modal.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  maxSize = 7;
  pageable: Pageable = { page: 0, sort: 'id', order: 'desc' };

  totalResults = 0;
  firstItem: number | null = null;
  lastItem: number | null = null;

  loadingPage = new Loading();

  @ViewChild(CreateAuthorModalComponent) createAuthorModalComponent!: CreateAuthorModalComponent;

  @ViewChild(AuthorSearchComponent) authorSearchComponent!: AuthorSearchComponent;

  @ViewChild(AuthorListComponent) authorListComponent!: AuthorListComponent;

  constructor(public contributorService: ContributorService, public authorService: AuthorService, private eventService: EventService) {
    eventService.authorsUpdateEmitter.subscribe(() => this.requestPage());
  }

  ngOnInit(): void {
    this.eventService.authorsUpdateEmitter.emit();
  }

  changePage(page: number) {
    this.pageable.page = page - 1;
    this.requestPage();
  }

  hasModifiedAuthors(): boolean {
    let modified = false;
    this.authorListComponent?.authorItemComponents?.forEach((authorItemComponent) => modified ||= authorItemComponent.modified());
    return modified;
  }

  requestPage() {
    if (!this.hasModifiedAuthors() || confirm('You have unsaved changes, do you want to discard them and reload the page?')) {
      this.authorService.getAuthors(this.authorSearchComponent.authorSearchDto, this.pageable).subscribe(
        (page) => {
          this.authorListComponent.authors = page.content;
          this.totalResults = page.totalElements;
          this.firstItem = this.pageable.page * this.authorService.pageSize + 1;
          this.lastItem = this.pageable.page * this.authorService.pageSize + page.content.length;
        }, this.loadingPage);
    }
  }
}
