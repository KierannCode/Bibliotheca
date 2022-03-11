import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';
import { LogInDropdownComponent } from './log-in-dropdown/log-in-dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User | null = null;

  @ViewChild('logInDropdownButton') logInDropdownButton!: ElementRef;

  @ViewChild(LogInDropdownComponent) logInDropdownComponent!: LogInDropdownComponent;

  constructor(userService: UserService) {
    userService.getAuthentifiedUser().subscribe({
      next: (user) => this.user = user,
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  ngOnInit(): void {
  }

  toggleLogInDropdownButton(): void {
    this.logInDropdownButton.nativeElement.click();
  }

  logOut(): void {
    this.user = null;
  }
}
