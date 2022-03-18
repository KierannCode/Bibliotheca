import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LogInDto } from 'src/app/dto/LogInDto';
import { ErrorMap } from 'src/app/service/util/ErrorMap';
import { ContributorService } from 'src/app/service/contributor.service';
import { AppConfig } from 'src/app/service/util/AppConfig';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { ErrorService } from 'src/app/service/error.service';

@Component({
  selector: 'app-log-in-dropdown',
  templateUrl: './log-in-dropdown.component.html',
  styleUrls: ['./log-in-dropdown.component.css']
})
export class LogInDropdownComponent implements OnInit {
  isOpen = false;

  logInDto: LogInDto = {};

  loading = false;

  @ViewChild(SignUpModalComponent) signUpModalComponent!: SignUpModalComponent;

  constructor(private contributorService: ContributorService, public config: AppConfig, public errorService: ErrorService) {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    this.errorService.flushErrors();
    this.loading = true;
    this.contributorService.logIn(this.logInDto).subscribe({
      next: (contributor) => {
        this.contributorService.contributor = contributor
        this.isOpen = false;
      },
      error: (errorResponse: HttpErrorResponse) => this.errorService.setErrors(errorResponse)
    }).add(() => this.loading = false);
  }
}
