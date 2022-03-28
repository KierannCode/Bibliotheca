import { Component } from '@angular/core';
import { ContributorService } from 'src/app/service/contributor.service';
import { AppConfig } from 'src/app/util/AppConfig';
import { Loading } from 'src/app/util/Loading';
import { NavbarManager } from '../NavbarManager';

@Component({
  selector: 'app-log-in-dropdown',
  templateUrl: './log-in-dropdown.component.html',
  styleUrls: ['./log-in-dropdown.component.css']
})
export class LogInDropdownComponent {
  loadingLogIn = new Loading();

  constructor(public navbarManager: NavbarManager, private contributorService: ContributorService, public config: AppConfig) {
  }

  logIn(): void {
    let observable = this.contributorService.logIn(this.navbarManager.logInDto);
    observable.callback = contributor => {
      this.navbarManager.collapseLogInDropdown();
      this.navbarManager.logInDto = {};
      this.navbarManager.contributor = contributor;
    }
    observable.loading = this.loadingLogIn;
    observable.subscribe();
  }

  openSignUpModal() {
    this.navbarManager.collapseLogInDropdown();
    this.navbarManager.openSignUpModal();
  }
}
