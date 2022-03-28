import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthorDto } from 'src/app/dto/AuthorDto';
import { AuthorService } from 'src/app/service/author.service';
import { EventService } from 'src/app/util/service/event.service';
import { Loading } from 'src/app/util/Loading';
import { AuthorManager } from '../AuthorManager';

@Component({
  selector: 'app-create-author-modal',
  templateUrl: './create-author-modal.component.html',
  styleUrls: ['./create-author-modal.component.css']
})
export class CreateAuthorModalComponent implements AfterViewInit {
  createAuthorDto: AuthorDto = { romanizedName: '', originalName: '' };

  loadingCreate = new Loading();

  @ViewChild('createAuthorModalTemplate') createAuthorModalTemplate!: TemplateRef<any>;

  constructor(public authorManager: AuthorManager, private authorService: AuthorService, private eventService: EventService) {
  }

  ngAfterViewInit() {
    this.authorManager.createAuthorModalTemplate = this.createAuthorModalTemplate;
  }

  createAuthor(): void {
    let observable = this.authorService.createAuthor(this.createAuthorDto);
    observable.callback = () => {
      this.authorManager.closeCreateAuthorModal();
      this.createAuthorDto = { romanizedName: '', originalName: '' };
      this.eventService.authorsUpdateEmitter.emit();
    };
    observable.loading = this.loadingCreate;
    observable.successMessageBuilder = (author) => `Author '${author.romanizedName}' successfully created`;
    observable.subscribe();
  }
}
