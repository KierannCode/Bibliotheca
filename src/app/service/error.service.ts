import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ErrorMap } from './util/ErrorMap';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  updateValidation = new EventEmitter<void>();

  validationErrors: ErrorMap = new ErrorMap;

  globalErrorCode: number | null = null;
  globalError: string | null = null;

  constructor() {
  }

  setErrors(errorResponse: HttpErrorResponse): void {
    switch(errorResponse.status) {
      case 422:
        this.validationErrors.import(errorResponse.error);
        break;
      default:
        console.error(errorResponse);
        this.globalErrorCode = errorResponse.status;
        this.globalError = errorResponse.message;
        break;
    }
    this.updateValidation.emit();
  }

  flushErrors(): void {
    this.validationErrors = new ErrorMap;
    this.globalErrorCode = null;
    this.globalError = null;
  }
}
