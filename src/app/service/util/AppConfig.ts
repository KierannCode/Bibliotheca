import { Injectable } from "@angular/core";
import { User } from "src/app/model/User";
import { UserService } from "../user.service";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    static API_ENDPOINT = 'http://192.168.1.77:8080';

    static CONTACT_EMAIL = 'admin@admin.com';

    user: User | null = null;

    constructor(private userService: UserService) {
        userService.getAuthenticatedUser().subscribe({
            next: (user) => this.user = user
        });
    }
}