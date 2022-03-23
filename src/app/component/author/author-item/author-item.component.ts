import { Component, Input, OnInit } from '@angular/core';
import { AuthorDto } from 'src/app/dto/AuthorDto';
import { Author } from 'src/app/model/Author';
import { AuthorService } from 'src/app/service/author.service';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {
  @Input() author!: Author;

  authorDto: AuthorDto = {};
  loadingUpdate = false;

  loadingDelete = false;

  constructor(private authorService: AuthorService, private eventService: EventService) { }

  ngOnInit(): void {
  }

  modified(): boolean {
    return Object.keys(this.authorDto).length != 0;
  }

  update(): void {
    this.loadingUpdate = true;
    this.authorService.updateAuthor(this.author.id, this.authorDto).subscribe({
      next: (author) => {
        this.authorDto = {};
        this.author = author;
      }
    }).add(() => this.loadingUpdate = false);
  }

  delete(): void {
    this.loadingDelete = true;
    this.authorService.deleteAuthor(this.author.id).subscribe({
      next: () => this.eventService.updateAuthors.emit()
    }).add(() => this.loadingDelete = false);
  }
}
