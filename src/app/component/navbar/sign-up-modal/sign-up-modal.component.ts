import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SignUpDto } from 'src/app/dto/SignUpDto';
import { ErrorMap } from 'src/app/service/util/ErrorMap';
import { AppConfig } from 'src/app/service/util/AppConfig';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LogInDropdownComponent } from '../log-in-dropdown/log-in-dropdown.component';
import { ContributorService } from 'src/app/service/contributor.service';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {
  modalRef?: BsModalRef;

  signUpDto: SignUpDto = { username: '', password: '' };

  loading = false;

  @ViewChild('template') modalTemplate?: TemplateRef<any>;

  @Input() parent!: LogInDropdownComponent;

  constructor(private contributorService: ContributorService, private modalService: BsModalService, public errorService: ErrorService, public config: AppConfig) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.errorService.flushErrors();
    this.loading = true;
    this.contributorService.signUp(this.signUpDto).subscribe({
      next: (contributor) => {
        this.modalRef?.hide();
        this.parent.logInDto.username = contributor.username;
        this.parent.logInDto.password = '';
        this.parent.isOpen = true;
      },
      error: (errorResponse: HttpErrorResponse) => this.errorService.setErrors(errorResponse)
    }).add(() => this.loading = false);
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modalTemplate!);
    this.modalService.onHide.subscribe(() => this.errorService.flushErrors());
  }
}
