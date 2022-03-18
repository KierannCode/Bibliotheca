import { Injectable } from "@angular/core";
import { Contributor } from "src/app/model/Contributor";
import { ContributorService } from "../contributor.service";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    API_ENDPOINT = 'http://localhost:8080';

    CONTACT_EMAIL = 'admin@admin.com';
}