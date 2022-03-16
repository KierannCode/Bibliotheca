import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LogInDto } from 'src/app/dto/LogInDto';
import { ErrorMap } from 'src/app/service/util/ErrorMap';
import { UserService } from 'src/app/service/user.service';
import { NavbarComponent } from '../navbar.component';
import { AppConfig } from 'src/app/service/util/AppConfig';

@Component({
  selector: 'app-log-in-dropdown',
  templateUrl: './log-in-dropdown.component.html',
  styleUrls: ['./log-in-dropdown.component.css']
})
export class LogInDropdownComponent implements OnInit {

  logInDto: LogInDto = {};

  errorMap: ErrorMap = new ErrorMap();

  loading = false;

  @Input()
  parent!: NavbarComponent;

  constructor(private userService: UserService, public config: AppConfig) {
  }

  ngOnInit(): void {
  }

  logIn(): void {
    this.errorMap = new ErrorMap();
    this.loading = true;
    this.userService.logIn(this.logInDto).subscribe({
      next: (user) => this.config.user = user,
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.errorMap = error.error;
            break;
          default:
            this.errorMap.put('unknown', error.message);
            break;
        }
      }
    }).add(() => this.loading = false);
  }
}
