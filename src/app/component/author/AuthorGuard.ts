import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { AuthorComponent } from "./author/author.component";

@Injectable({ providedIn: 'root' })
export class AuthorGuard implements CanDeactivate<AuthorComponent> {
    canDeactivate(component: AuthorComponent): boolean {
        return !component.hasModifiedAuthors() || confirm('Unsaved changes will be discarded, are you sure?');
    }
}