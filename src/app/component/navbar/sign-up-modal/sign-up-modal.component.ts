import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { SignUpDto } from 'src/app/dto/SignUpDto';
import { AppConfig } from 'src/app/util/AppConfig';
import { ContributorService } from 'src/app/service/contributor.service';
import { Loading } from 'src/app/util/Loading';
import { NavbarManager } from '../NavbarManager';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements AfterViewInit {
  signUpDto: SignUpDto = {};

  loadingSignUp = new Loading();

  @ViewChild('signUpModalTemplate') signUpModalTemplate!: TemplateRef<any>;

  constructor(public navbarManager: NavbarManager, private contributorService: ContributorService, public config: AppConfig) {
  }

  ngAfterViewInit(): void {
    this.navbarManager.signUpModalTemplate = this.signUpModalTemplate;
  }

  signUp(): void {
    let observable = this.contributorService.signUp(this.signUpDto);
    observable.callback = contributor => {
      this.navbarManager.closeSignUpModal();
      this.signUpDto = {};
      this.navbarManager.logInDto.username = contributor.username;
      this.navbarManager.logInDto.rawPassword = '';
      this.navbarManager.expandLogInDropdown();
    }
    observable.loading = this.loadingSignUp;
    observable.successMessageBuilder = contributor => `Your account '${contributor.username}' was successfully created`;
    observable.subscribe();
  }
}
