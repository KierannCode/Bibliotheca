import { Component, Input, OnInit, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Author } from 'src/app/model/Author';
import { AuthorItemComponent } from '../author-item/author-item.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  @Input() authors!: Array<Author>;

  @ViewChildren(AuthorItemComponent) authorItemComponents!: QueryList<AuthorItemComponent>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
