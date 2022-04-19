import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../model/Token';
import { AppConfig } from '../util/AppConfig';
import { ManagedObservable } from '../util/ManagedObservable';
import { HttpService } from '../util/service/http.service';
import { ObservableService } from '../util/service/observable.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpService, private config: AppConfig, private observableService: ObservableService) { }

  generateToken(): ManagedObservable<Token> {
    return this.observableService.manage(this.http.post(`${this.config.API_ENDPOINT}/token`, {}));
  }
}
