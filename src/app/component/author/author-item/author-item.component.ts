import { Component, Input, OnInit } from '@angular/core';
import { AuthorDto } from 'src/app/dto/AuthorDto';
import { Author } from 'src/app/model/Author';
import { AuthorService } from 'src/app/service/author.service';
import { EventService } from 'src/app/util/service/event.service';
import { Loading } from 'src/app/util/Loading';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {
  @Input() author!: Author;

  authorDto: AuthorDto = {};

  loadingUpdate = new Loading();

  loadingDelete = new Loading();

  constructor(private authorService: AuthorService, private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  modified(): boolean {
    return Object.keys(this.authorDto).length != 0;
  }

  resetAuthorDto(): void {
    this.authorDto = {};
  }

  updateAuthor(): void {
    this.authorService.updateAuthor(this.author.id, this.authorDto).subscribe((author) => {
      this.author = author;
      this.resetAuthorDto();
      this.eventService.authorsUpdateEmitter.emit();
    }, this.loadingUpdate, (author) => `Author '${author.romanizedName}' successfully updated`);
  }

  deleteAuthor(): void {
    this.authorService.deleteAuthor(this.author.id).subscribe(() => this.eventService.authorsUpdateEmitter.emit(),
      this.loadingDelete, () => `Author successfully deleted`);
  }
}
