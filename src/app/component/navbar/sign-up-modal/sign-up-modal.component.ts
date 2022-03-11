import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { UserDto } from 'src/app/dto/UserDto';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements OnInit {

  signUpDto: UserDto = { username: '', password: '' };

  passwordConfirmation: string = '';

  @ViewChild('closeSignUpButton') closeSignUpButton!: ElementRef;

  errors: Map<string, Array<string>> = new Map();

  @Input()
  parent!: NavbarComponent;

  constructor() { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.errors.clear();
    if (this.signUpDto.username === '') {
      this.errors.set('name', Array.of('The username cannot be empty', 'This username is not available'));
    }
    if (this.signUpDto.password === '') {
      this.errors.set('password', Array.of('The password cannot be empty'));
    }
    if (this.passwordConfirmation !== this.signUpDto.password) {
      this.errors.set('passwordConfirmation', Array.of('The password and confirmation password do not match'));
    }
    if (this.errors.size == 0) {
      console.log(this.signUpDto);
      this.closeSignUpButton.nativeElement.click();
      this.parent.logInDropdownComponent.logInDto.username = this.signUpDto.username;
      setTimeout(() => {
        this.parent.toggleLogInDropdownButton();
      }, 200);
    }
  }
}
