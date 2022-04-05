import { Component } from '@angular/core';
import { ContributorService } from 'src/app/service/contributor.service';
import { TokenService } from 'src/app/service/token.service';
import { NavbarManager } from '../NavbarManager';

@Component({
  selector: 'app-contributor-dropdown',
  templateUrl: './contributor-dropdown.component.html',
  styleUrls: ['./contributor-dropdown.component.css']
})
export class ContributorDropdownComponent {
  constructor(public navbarManager: NavbarManager, private contributorService: ContributorService, private tokenService: TokenService) { }

  logOut(): void {
    let observable = this.contributorService.logOut();
    observable.callback = () => this.navbarManager.contributor = null;
    observable.subscribe();
  }

  generateToken() {
    let observable = this.tokenService.generateToken();
    observable.callback = token => navigator.clipboard.writeText(token.value);
    observable.successMessageBuilder = token => `Token successfully generated : ${token.value} (copied to clipboard)`;
    observable.successMessageTimeOut = undefined;
    observable.subscribe();
  }
}
