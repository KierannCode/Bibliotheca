import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ErrorMap } from './util/ErrorMap';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  validationErrors = new ErrorMap();

  globalErrorCode: number | null = null;
  globalError: string | null = null;

  constructor(private eventService: EventService) {
  }

  setErrors(errorResponse: HttpErrorResponse): void {
    switch(errorResponse.status) {
      case 422:
        this.validationErrors = new ErrorMap(Object.entries(errorResponse.error));
        break;
      default:
        console.error(errorResponse);
        this.globalErrorCode = errorResponse.status;
        this.globalError = errorResponse.message;
        break;
    }
    this.eventService.updateValidation.emit();
  }

  flushErrors(): void {
    this.validationErrors = new ErrorMap();
    this.globalErrorCode = null;
    this.globalError = null;
    this.eventService.updateValidation.emit();
  }
}
