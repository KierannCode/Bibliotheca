import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AppConfig } from 'src/app/service/util/AppConfig';
import { LogInDropdownComponent } from './log-in-dropdown/log-in-dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('logInDropdownButton') logInDropdownButton!: ElementRef;

  @ViewChild(LogInDropdownComponent) logInDropdownComponent!: LogInDropdownComponent;

  constructor(private userService: UserService, public config: AppConfig) { }

  ngOnInit(): void {
  }

  toggleLogInDropdownButton(): void {
    this.logInDropdownButton.nativeElement.click();
  }

  logOut(): void {
    this.userService.logOut().subscribe();
    this.config.user = null;
  }
}
