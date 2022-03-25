import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthorDto } from 'src/app/dto/AuthorDto';
import { AuthorService } from 'src/app/service/author.service';
import { ErrorService } from 'src/app/service/error.service';
import { EventService } from 'src/app/service/event.service';
import { AuthorComponent } from '../author/author.component';

@Component({
  selector: 'app-create-author-modal',
  templateUrl: './create-author-modal.component.html',
  styleUrls: ['./create-author-modal.component.css']
})
export class CreateAuthorModalComponent implements OnInit {
  modalRef?: BsModalRef;

  authorDto: AuthorDto = {romanizedName: '', originalName: ''};

  loading = false;

  @ViewChild('template') modalTemplate?: TemplateRef<any>;

  @Input() parent!: AuthorComponent;

  constructor(private authorService: AuthorService, public errorService: ErrorService, private modalService: BsModalService, private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  createAuthor(): void {
    this.errorService.flushErrors();
    this.loading = true;
    this.authorService.createAuthor(this.authorDto).subscribe({
      next: () => {
        this.modalRef?.hide();
        this.eventService.createAlert.emit({type: 'success', message: 'Author successfully created', timeout: 2000});
        this.eventService.updateAuthors.emit();
      },
      error: (errorResponse: HttpErrorResponse) => this.errorService.setErrors(errorResponse)
    }).add(() => this.loading = false);
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modalTemplate!);
  }
}
