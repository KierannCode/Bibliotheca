import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ErrorService } from "./service/error.service";
import { Loading } from "./Loading";
import { EventService } from "./service/event.service";

export class ManagedObservable<T> {
    callback?: (value: T) => void;

    loading?: Loading;

    successMessageBuilder?: (value: T) => string;

    successMessageTimeOut: number | undefined = 4000;

    constructor(private observable: Observable<T>, private errorService: ErrorService, private eventService: EventService) { }

    subscribe(): void {
        this.errorService.flushErrors();
        let subscription = this.observable.subscribe({
            next: value => {
                if (this.callback) {
                    this.callback(value);
                }
                if (this.successMessageBuilder) {
                    this.eventService.alertEmitter.emit({ type: 'success', message: this.successMessageBuilder(value), timeout: this.successMessageTimeOut });
                }
            },
            error: (errorResponse: HttpErrorResponse) => this.errorService.setErrors(errorResponse)
        });
        if (this.loading) {
            this.loading.progress = 0;
            subscription.add(() => {
                if (this.loading) {
                    this.loading.progress = 1;
                }
            });
        }
    }
}