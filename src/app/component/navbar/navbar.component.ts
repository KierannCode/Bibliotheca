import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/model/Token';
import { TokenService } from 'src/app/service/token.service';
import { ContributorService } from 'src/app/service/contributor.service';
import { AppConfig } from 'src/app/service/util/AppConfig';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public contributorService: ContributorService) { }

  ngOnInit(): void {
  }
}
