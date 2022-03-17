import { Injectable } from "@angular/core";
import { Contributor } from "src/app/model/Contributor";
import { ContributorService } from "../contributor.service";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    static API_ENDPOINT = 'http://localhost:8080';

    static CONTACT_EMAIL = 'admin@admin.com';

    contributor: Contributor | null = null;

    constructor(private userService: ContributorService) {
        userService.getAuthenticatedContributer().subscribe({
            next: contributor => this.contributor = contributor
        });
    }
}