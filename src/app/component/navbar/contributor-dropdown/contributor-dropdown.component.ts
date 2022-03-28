import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/model/Token';
import { ContributorService } from 'src/app/service/contributor.service';
import { TokenService } from 'src/app/service/token.service';
import { AppConfig } from 'src/app/util/AppConfig';
import { EventService } from 'src/app/util/service/event.service';

@Component({
  selector: 'app-contributor-dropdown',
  templateUrl: './contributor-dropdown.component.html',
  styleUrls: ['./contributor-dropdown.component.css']
})
export class ContributorDropdownComponent implements OnInit {
  constructor(public contributorService: ContributorService, private tokenService: TokenService, private eventService: EventService, public config: AppConfig) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.contributorService.logOut().subscribe(() => this.contributorService.contributor = null);
  }

  generateToken() {
    this.tokenService.generateToken().subscribe(() => null, undefined, token => `Token successfully generated : ${token.value}`, undefined);
  }
}
