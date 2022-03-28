import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { ErrorMap } from '../ErrorMap';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  validationErrors = new ErrorMap();

  constructor(private eventService: EventService) {
  }

  setErrors(errorResponse: HttpErrorResponse): void {
    switch(errorResponse.status) {
      case 0:
        this.eventService.alertEmitter.emit({type: 'danger', message: `Unknown error : ${errorResponse.message}`, timeout: 10000});
        break;
      case 422:
        this.validationErrors = new ErrorMap(Object.entries(errorResponse.error));
        break;
      default:
        this.eventService.alertEmitter.emit({type: 'danger', message: `Error ${errorResponse.status} : ${errorResponse.error}`, timeout: 10000});
        break;
    }
    this.eventService.validationUpdateEmitter.emit();
  }

  flushErrors(): void {
    this.validationErrors = new ErrorMap();
    this.eventService.validationUpdateEmitter.emit();
  }
}
