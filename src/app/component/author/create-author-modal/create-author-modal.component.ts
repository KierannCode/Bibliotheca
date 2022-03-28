import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthorDto } from 'src/app/dto/AuthorDto';
import { AuthorService } from 'src/app/service/author.service';
import { ErrorService } from 'src/app/util/service/error.service';
import { EventService } from 'src/app/util/service/event.service';
import { Loading } from 'src/app/util/Loading';
import { AuthorComponent } from '../author/author.component';

@Component({
  selector: 'app-create-author-modal',
  templateUrl: './create-author-modal.component.html',
  styleUrls: ['./create-author-modal.component.css']
})
export class CreateAuthorModalComponent implements OnInit {
  modalRef?: BsModalRef;

  authorDto: AuthorDto = {romanizedName: '', originalName: ''};

  loadingCreate = new Loading();

  @ViewChild('template') modalTemplate?: TemplateRef<any>;

  @Input() parent!: AuthorComponent;

  constructor(private authorService: AuthorService, public errorService: ErrorService, private modalService: BsModalService, private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  createAuthor(): void {
    this.authorService.createAuthor(this.authorDto).subscribe(() => {
        this.closeModal();
        this.eventService.authorsUpdateEmitter.emit();
      }, this.loadingCreate, (author) => `Author '${author.romanizedName}' successfully created`);
  }

  openModal() {
    this.errorService.flushErrors();
    this.modalRef = this.modalService.show(this.modalTemplate!);
  }

  closeModal() {
    this.modalRef?.hide();
  }
}
