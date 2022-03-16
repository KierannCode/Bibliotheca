import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SignUpDto } from 'src/app/dto/SignUpDto';
import { ErrorMap } from 'src/app/service/util/ErrorMap';
import { UserService } from 'src/app/service/user.service';
import { NavbarComponent } from '../navbar.component';
import { AppConfig } from 'src/app/service/util/AppConfig';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {

  signUpDto: SignUpDto = { username: '', password: '' };

  passwordConfirmation: string = '';

  contactEmail: string = AppConfig.CONTACT_EMAIL;

  loading = false;

  @ViewChild('closeSignUpButton') closeSignUpButton!: ElementRef;

  errorMap: ErrorMap = new ErrorMap();

  @Input()
  parent!: NavbarComponent;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.errorMap = new ErrorMap();
    this.loading = true;
    this.userService.signUp(this.signUpDto).subscribe({
      next: (user) => {
        this.closeSignUpButton.nativeElement.click();
        this.parent.logInDropdownComponent.logInDto.username = user.name;
        setTimeout(() => {
          this.parent.toggleLogInDropdownButton();
        }, 200);
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
}
