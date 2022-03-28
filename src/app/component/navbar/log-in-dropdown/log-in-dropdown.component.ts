import { Component, OnInit, ViewChild } from '@angular/core';
import { LogInDto } from 'src/app/dto/LogInDto';
import { ContributorService } from 'src/app/service/contributor.service';
import { AppConfig } from 'src/app/util/AppConfig';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { ErrorService } from 'src/app/util/service/error.service';
import { Loading } from 'src/app/util/Loading';

@Component({
  selector: 'app-log-in-dropdown',
  templateUrl: './log-in-dropdown.component.html',
  styleUrls: ['./log-in-dropdown.component.css']
})
export class LogInDropdownComponent implements OnInit {
  isVisible = false;

  logInDto: LogInDto = {};

  loadingLogIn = new Loading();

  @ViewChild(SignUpModalComponent) signUpModalComponent!: SignUpModalComponent;

  constructor(private contributorService: ContributorService, public config: AppConfig, public errorService: ErrorService) {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    this.contributorService.logIn(this.logInDto).subscribe((contributor) => {
        this.contributorService.contributor = contributor
        this.collapseDropdown();
      }, this.loadingLogIn);
  }

  expandDropdown() {
    this.errorService.flushErrors();
    this.isVisible = true;
  }

  collapseDropdown() {
    this.isVisible = false;
  }

  openSignUpModal() {
    this.collapseDropdown();
    this.signUpModalComponent.openModal();
  }
}
