import { Component, Input } from '@angular/core';
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
export class AuthorItemComponent {
  @Input() author!: Author;

  updateAuthorDto: AuthorDto = {};

  loadingUpdate = new Loading();

  loadingDelete = new Loading();

  constructor(private authorService: AuthorService, private eventService: EventService) {
  }

  modify(field: keyof AuthorDto) {
    this.updateAuthorDto[field] = this.author[field];
    this.author.modified = true;
  }

  resetUpdateAuthorDto(): void {
    this.updateAuthorDto = {};
    this.author.modified = false;
  }

  updateAuthor(): void {
    let observable = this.authorService.updateAuthor(this.author.id, this.updateAuthorDto);
    observable.callback = () => {
      this.author.modified = false;
      this.eventService.authorsUpdateEmitter.emit();
    };
    observable.loading = this.loadingUpdate
    observable.successMessageBuilder = author => `Author '${author.romanizedName}' successfully updated`;
    observable.subscribe();
  }

  deleteAuthor(): void {
    let observable = this.authorService.deleteAuthor(this.author.id);
    observable.callback = () => this.eventService.authorsUpdateEmitter.emit();
    observable.loading = this.loadingDelete;
    observable.successMessageBuilder = () => `Author successfully deleted`;
    observable.subscribe();
  }
}
