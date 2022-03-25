import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SignUpDto } from 'src/app/dto/SignUpDto';
import { AppConfig } from 'src/app/util/AppConfig';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LogInDropdownComponent } from '../log-in-dropdown/log-in-dropdown.component';
import { ContributorService } from 'src/app/service/contributor.service';
import { ErrorService } from 'src/app/util/service/error.service';
import { Loading } from 'src/app/util/Loading';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {
  modalRef!: BsModalRef;

  signUpDto: SignUpDto = { username: '', password: '' };

  loadingSignUp = new Loading();

  @ViewChild('template') modalTemplate?: TemplateRef<any>;

  @Input() parent!: LogInDropdownComponent;

  constructor(private contributorService: ContributorService, private modalService: BsModalService, public errorService: ErrorService, public config: AppConfig) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.contributorService.signUp(this.signUpDto).subscribe((contributor) => {
        this.modalRef?.hide();
        this.parent.logInDto.username = contributor.username;
        this.parent.logInDto.password = '';
        this.parent.expandDropdown();
      }, this.loadingSignUp, (contributor) => `Contributor '${contributor.username}' successfully registered`);
  }

  openModal() {
    this.errorService.flushErrors();
    this.modalRef = this.modalService.show(this.modalTemplate!);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
