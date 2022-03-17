import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SignUpDto } from 'src/app/dto/SignUpDto';
import { ErrorMap } from 'src/app/service/util/ErrorMap';
import { AppConfig } from 'src/app/service/util/AppConfig';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LogInDropdownComponent } from '../log-in-dropdown/log-in-dropdown.component';
import { ContributorService } from 'src/app/service/contributor.service';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {

  signUpDto: SignUpDto = { username: '', password: '' };

  modalRef?: BsModalRef;

  contactEmail: string = AppConfig.CONTACT_EMAIL;

  loading = false;

  errorMap: ErrorMap = new ErrorMap();

  @ViewChild('template') template?: TemplateRef<any>;

  @Input()
  parent!: LogInDropdownComponent;

  constructor(private contributorService: ContributorService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.errorMap = new ErrorMap();
    this.loading = true;
    this.contributorService.signUp(this.signUpDto).subscribe({
      next: (contributor) => {
        this.modalRef?.hide();
        this.parent.logInDto.username = contributor.username;
        this.parent.logInDto.password = '';
        this.parent.isOpen = true;
      },
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.errorMap.import(error.error);
            break;
          default:
            this.errorMap.put('unknown', error.message);
            break;
        }
      }
    }).add(() => this.loading = false);
  }

  openModal() {
    if (this.template != undefined) {
      this.modalRef = this.modalService.show(this.template);
    }
  }
}
