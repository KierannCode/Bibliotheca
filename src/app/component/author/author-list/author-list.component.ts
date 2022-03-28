import { Component } from '@angular/core';
import { AuthorManager } from '../AuthorManager';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent {
  constructor(public authorManager: AuthorManager) {
  }
}
