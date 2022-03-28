import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ErrorService } from "./service/error.service";
import { Loading } from "./Loading";
import { EventService } from "./service/event.service";

export class ManagedObservable<T> {
    constructor(private observable: Observable<T>, private errorService: ErrorService, private eventService: EventService) { }

    subscribe(callback: (value: T) => void, loading?: Loading, successMessage?: (value: T) => string, successAlertTimeOut = 3000): void {
        console.log(this.errorService);
        this.errorService.flushErrors();
        let subscription = this.observable.subscribe({
            next: value => {
                callback(value);
                if (successMessage !== undefined) {
                    this.eventService.alertEmitter.emit({type: 'success', message: successMessage(value), timeout: successAlertTimeOut});
                }
            },
            error: (errorResponse: HttpErrorResponse) => this.errorService.setErrors(errorResponse)
        });
        if (loading !== undefined) {
            loading.progress = 0;
            subscription.add(() => {
                loading.progress = 1;
            });
        }
    }
}