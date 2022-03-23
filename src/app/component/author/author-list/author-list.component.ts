import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/model/Author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  @Input() authors!: Array<Author>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
