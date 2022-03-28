import { EventEmitter, Injectable } from '@angular/core';
import { Alert } from '../Alert';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  validationUpdateEmitter = new EventEmitter<void>();

  authorsUpdateEmitter = new EventEmitter<void>();

  alertEmitter = new EventEmitter<Alert>();

  constructor() { }
}
