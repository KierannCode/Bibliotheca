import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    API_ENDPOINT = 'https://f8d3-109-25-208-51.ngrok.io';

    CONTACT_EMAIL = 'admin@admin.com';
}