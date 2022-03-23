import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from 'src/app/model/Author';
import { AuthorService } from 'src/app/service/author.service';
import { ContributorService } from 'src/app/service/contributor.service';
import { AuthorSearchComponent } from '../author-search/author-search.component';
import { CreateAuthorModalComponent } from '../create-author-modal/create-author-modal.component';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  hideSearch = true;

  @ViewChild(CreateAuthorModalComponent) createAuthorModalComponent!: CreateAuthorModalComponent;

  constructor(public contributorService: ContributorService) {
  }

  ngOnInit(): void {
  }
}
