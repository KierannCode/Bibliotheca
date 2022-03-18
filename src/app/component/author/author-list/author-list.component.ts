import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Author } from 'src/app/model/Author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors!: Array<Author>;
  totalResults!: number;

  constructor(public authorService: AuthorService) {
    this.loadPage(1);
  }

  ngOnInit(): void {
  }

  loadPage(page: number) {
    console.log(page);
    this.authorService.getAuthors(page - 1, 'id', 'desc').subscribe({
      next: (page) => {
        console.log(page);
        this.authors = page.content;
        this.totalResults = page.totalElements;
      }
    });
  }
}
