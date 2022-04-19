import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    API_ENDPOINT = 'http://localhost:8080';

    CONTACT_EMAIL = 'admin@admin.com';

    AUTHENTICATION_TOKEN_HEADER = 'authentication-token';
}