import { Injectable, TemplateRef } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AuthorSearchDto } from "src/app/dto/AuthorSearchDto";
import { Author } from "src/app/model/Author";
import { ErrorService } from "src/app/util/service/error.service";
import { AuthorComponent } from "./author.component";

@Injectable({ providedIn: 'root' })
export class AuthorManager implements CanDeactivate<AuthorComponent> {
    isSearchVisible = false;
    authorSearchDto: AuthorSearchDto = {};
  
    createAuthorModal!: BsModalRef;
    createAuthorModalTemplate!: TemplateRef<any>;
  
    paginationMaxSize = 7;
  
    authors = new Array<Author>();

    constructor(private errorService: ErrorService, private modalService: BsModalService) { }

    expandAuthorSearch(): void {
        this.isSearchVisible = true;
    }

    collapseAuthorSearch(): void {
        this.isSearchVisible = false;
        this.errorService.flushErrors();
    }

    openCreateAuthorModal(): void {
        this.createAuthorModal = this.modalService.show(this.createAuthorModalTemplate);
    }

    closeCreateAuthorModal(): void {
        this.createAuthorModal.hide();
        this.errorService.flushErrors();
    }

    canDeactivate(component: AuthorComponent): boolean {
        if (!component.hasModifiedAuthors() || confirm('Unsaved changes will be discarded, are you sure?')) {
            this.authors = new Array<Author>();
            return true;
        }
        return false;
    }
}