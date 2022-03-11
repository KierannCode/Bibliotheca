import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/dto/UserDto';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-log-in-dropdown',
  templateUrl: './log-in-dropdown.component.html',
  styleUrls: ['./log-in-dropdown.component.css']
})
export class LogInDropdownComponent implements OnInit {

  logInDto: UserDto = {};

  @Input()
  parent!: NavbarComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    if (this.logInDto.username != undefined) {
      this.parent.user = {name: this.logInDto.username, role: 'Unknown'};
      this.parent.toggleLogInDropdownButton();
    }
  }
}
