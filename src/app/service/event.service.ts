import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  updateValidation = new EventEmitter<void>();

  updateAuthors = new EventEmitter<void>();

  constructor() { }
}
