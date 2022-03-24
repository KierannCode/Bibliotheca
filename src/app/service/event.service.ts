import { EventEmitter, Injectable } from '@angular/core';
import { Alert } from './util/Alert';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  updateValidation = new EventEmitter<void>();

  updateAuthors = new EventEmitter<void>();

  createAlert = new EventEmitter<Alert>();

  constructor() { }
}
