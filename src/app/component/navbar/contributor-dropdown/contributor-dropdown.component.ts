import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/model/Token';
import { ContributorService } from 'src/app/service/contributor.service';
import { TokenService } from 'src/app/service/token.service';
import { AppConfig } from 'src/app/service/util/AppConfig';

@Component({
  selector: 'app-contributor-dropdown',
  templateUrl: './contributor-dropdown.component.html',
  styleUrls: ['./contributor-dropdown.component.css']
})
export class ContributorDropdownComponent implements OnInit {
  token: Token | null = null;

  constructor(private contributorService: ContributorService, private tokenService: TokenService, public config: AppConfig) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.contributorService.logOut().subscribe(() => this.config.contributor = null);
  }

  generateToken() {
    this.tokenService.generateToken().subscribe(token => this.token = token);
  }
}
