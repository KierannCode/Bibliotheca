import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ErrorMap } from './util/ErrorMap';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  validationErrors = new ErrorMap();

  constructor(private eventService: EventService) {
  }

  setErrors(errorResponse: HttpErrorResponse): void {
    switch(errorResponse.status) {
      case 422:
        this.validationErrors = new ErrorMap(Object.entries(errorResponse.error));
        break;
      default:
        this.eventService.createAlert.emit({type: 'danger', message: errorResponse.error, timeout: 10000});
        break;
    }
    this.eventService.updateValidation.emit();
  }

  flushErrors(): void {
    this.validationErrors = new ErrorMap();
    this.eventService.updateValidation.emit();
  }
}
