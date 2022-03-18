import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ErrorService } from '../error.service';
@Directive({
    selector: '[validated]'
})
export class ValidationDirective {
    @Input('validated') field!: string;

    errorListElement = document.createElement('div');

    constructor(private eleRef: ElementRef, errorService: ErrorService) {
        this.errorListElement.classList.add('invalid-feedback');
        eleRef.nativeElement.after(this.errorListElement);
        
        errorService.updateValidation.subscribe(() => {
            this.errorListElement.innerHTML = '';
            eleRef.nativeElement.classList.remove('is-valid');
            eleRef.nativeElement.classList.remove('is-invalid');

            if (errorService.validationErrors.has(this.field)) {
                eleRef.nativeElement.classList.add('is-invalid');
                for (let message of errorService.validationErrors.get(this.field)) {
                    let errorMessageElement = document.createElement('div');
                    errorMessageElement.textContent = message;
                    this.errorListElement.appendChild(errorMessageElement);
                }
            } else if (errorService.validationErrors.size > 0) {
                eleRef.nativeElement.classList.add('is-valid');
            }
        });
    }
}