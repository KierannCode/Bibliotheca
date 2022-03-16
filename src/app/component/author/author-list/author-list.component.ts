import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private authorService: AuthorService) {
    authorService.getAuthors(0, 'id', 'desc').subscribe({
      next: (page) => {
        this.authors = page.content;
        this.totalResults = page.totalElements;
      }
    });
  }

  ngOnInit(): void {
  }

}
