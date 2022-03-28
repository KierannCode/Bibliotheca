import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagedObservable } from '../ManagedObservable';
import { ErrorService } from './error.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor(private errorService: ErrorService, private eventService: EventService) { }

  manage<T>(observable: Observable<T>): ManagedObservable<T> {
    return new ManagedObservable(observable, this.errorService, this.eventService);
  }
}
