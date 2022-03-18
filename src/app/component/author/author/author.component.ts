import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/model/Author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  showSearch = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
