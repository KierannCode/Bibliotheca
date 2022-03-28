import { Injectable, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { LogInDto } from "src/app/dto/LogInDto";
import { Contributor } from "src/app/model/Contributor";
import { ContributorService } from "src/app/service/contributor.service";
import { ErrorService } from "src/app/util/service/error.service";

@Injectable({
    providedIn: 'root'
})
export class NavbarManager {
    contributor: Contributor | null = null;

    isLogInDropdownVisible = false;
    logInDto: LogInDto = {};

    signUpModal!: BsModalRef;
    signUpModalTemplate!: TemplateRef<any>;

    constructor(contributorService: ContributorService, private errorService: ErrorService, private modalService: BsModalService) {
        let observable = contributorService.getAuthenticatedContributer();
        observable.callback = contributor => this.contributor = contributor;
        observable.subscribe();
    }

    expandLogInDropdown() {
        this.isLogInDropdownVisible = true;
    }

    collapseLogInDropdown() {
        this.isLogInDropdownVisible = false;
        this.errorService.flushErrors();
    }

    openSignUpModal(): void {
        this.signUpModal = this.modalService.show(this.signUpModalTemplate);
    }

    closeSignUpModal(): void {
        this.signUpModal.hide();
        this.errorService.flushErrors();
    }
}