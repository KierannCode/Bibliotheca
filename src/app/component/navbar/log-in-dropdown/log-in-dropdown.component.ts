import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LogInDto } from 'src/app/dto/LogInDto';
import { ErrorMap } from 'src/app/service/util/ErrorMap';
import { ContributorService } from 'src/app/service/contributor.service';
import { AppConfig } from 'src/app/service/util/AppConfig';
import { SignUpModalComponent } from '../sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'app-log-in-dropdown',
  templateUrl: './log-in-dropdown.component.html',
  styleUrls: ['./log-in-dropdown.component.css']
})
export class LogInDropdownComponent implements OnInit {

  isOpen = false;

  logInDto: LogInDto = {};

  errorMap: ErrorMap = new ErrorMap();

  loading = false;

  @ViewChild(SignUpModalComponent) signUpModalComponent!: SignUpModalComponent;

  constructor(private contributorService: ContributorService, public config: AppConfig) {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    this.errorMap = new ErrorMap();
    this.loading = true;
    this.contributorService.logIn(this.logInDto).subscribe({
      next: (contributor) => this.config.contributor = contributor,
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.errorMap = error.error;
            break;
          default:
            this.errorMap.put('unknown', error.error);
            break;
        }
      }
    }).add(() => this.loading = false);
  }
}
