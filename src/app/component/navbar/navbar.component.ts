import { Component, OnInit } from '@angular/core';
import { ContributorService } from 'src/app/service/contributor.service';

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
